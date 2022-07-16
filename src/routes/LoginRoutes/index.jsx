import { useContext, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import ContainerLogin from './styles';

import logo from '../../assets/images/logo.png';
import DesactiveSucess from '../../pages/DesactiveSucess';
import ForgetPassword from '../../pages/ForgetPassword';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import { Context } from '../../services/context';

const LoginRoutes = () => {
	const { token } = useContext(Context);
	const route = useRouteMatch();
	const history = useHistory();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const tokenStorage = JSON.parse(window.localStorage.getItem('token'));
		if (!tokenStorage?.acessToken) {
			setLoading(false);
			return;
		}
		history.replace('/dashboard');
		setLoading(false);
	}, []);

	useEffect(() => {
		if (!token?.acessToken) {
			return;
		}
		window.localStorage.setItem('token', JSON.stringify(token));
	}, [token]);

	return (
		<ContainerLogin>
			{!loading && (
				<>
					<div>
						<img src={logo} alt="logo" />
					</div>
					<Switch>
						<Route exact path={`${route.path}`} component={Login} />
						<Route
							exact
							path={`${route.path}/esqueciSenha`}
							component={ForgetPassword}
						/>
						<Route
							exact
							path={`${route.path}/cadastrar`}
							component={Register}
						/>
						<Route
							exact
							path={`${route.path}/contaDesativada`}
							component={DesactiveSucess}
						/>
					</Switch>
				</>
			)}
		</ContainerLogin>
	);
};

export default LoginRoutes;
