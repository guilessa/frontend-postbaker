import jwtDecode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import ContainerDashBoard, { ContainerProduct } from './styles';

import Aside from '../../components/Aside';
import Header from '../../components/Header';
import NewClient from '../../components/NewClient';
import api from '../../config/api';
import Modal from '../../Container/Modal';
import ChangeConfigPayment from '../../pages/ChangeConfigPayment';
import ClientConfig from '../../pages/ClientConfig';
import ConfigUser from '../../pages/ConfigUser';
import DashBoard from '../../pages/DashBoard';
import DesactiveAccount from '../../pages/DesactiveAccount';
import PageBlock from '../../pages/PageBlock';
import { Context } from '../../services/context';

const DashBoardRoutes = () => {
	const route = useRouteMatch();
	const { showModal, handleShowModal, addUser, fetchMoreClients } = useContext(
		Context
	);
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		setLoading(true);

		async function fetchData() {
			const tokenStorage = JSON.parse(window.localStorage.getItem('token'));
			if (!tokenStorage?.acessToken) {
				setLoading(false);

				if (history.location.pathname === '/dashboard/erro-pagarme') {
					return;
				}
				history.replace('/login');
				return;
			}

			const content = jwtDecode(tokenStorage?.acessToken);
			try {
				const user = await api.get(`users/${content.user_id}/`);
				addUser(user.data);
				setLoading(false);
				fetchMoreClients();
			} catch {
				window.localStorage.clear();
				history.replace('/login');
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	return (
		<ContainerDashBoard>
			{!loading && (
				<>
					<Header />
					<Switch>
						<Route
							exact
							path={`${route.path}/configuracao`}
							component={ConfigUser}
						/>
						<Route
							exact
							path={`${route.path}/pagamentoConfiguracao`}
							component={ChangeConfigPayment}
						/>
						<Route
							exact
							path={`${route.path}/desativarConta`}
							component={DesactiveAccount}
						/>
						<Route
							exact
							path={`${route.path}/erro-pagarme`}
							component={PageBlock}
						/>

						<Route path={`${route.path}`}>
							<ContainerProduct>
								<Modal
									showModal={showModal.show}
									handleOutClick={() =>
										handleShowModal(props => ({ ...props, show: false }))
									}
								>
									<NewClient
										editClient={{
											edit: showModal.edit,
											client: showModal?.client,
										}}
										erroClient={e => {
											if (e.response?.status === 500) {
												history.push(`${route.path}/erro-pagarme`);
											}
											handleShowModal(props => ({ ...props, show: false }));
										}}
										saveClient={() => {
											fetchMoreClients();
											handleShowModal(props => ({ ...props, show: false }));
										}}
										handleClose={() =>
											handleShowModal(props => ({ ...props, show: false }))
										}
									/>
								</Modal>
								<Aside />
								<Switch>
									<Route exact path={`${route.path}`} component={DashBoard} />
									<Route
										exact
										path={`${route.path}/cliente/:id/post`}
										component={ClientConfig}
									/>
								</Switch>
							</ContainerProduct>
						</Route>
					</Switch>
				</>
			)}
		</ContainerDashBoard>
	);
};

export default DashBoardRoutes;
