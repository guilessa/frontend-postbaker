import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Container from './styles';

import Card from '../../components/Card';
import { Context } from '../../services/context';

const DashBoard = () => {
	const { handleShowModal, clients, user } = useContext(Context);
	const history = useHistory();

	return (
		<Container>
			<div className="header">
				<p>Bem vindo(a), {user?.name || 'Usuário!'}</p>
				<h2>Dashboard</h2>
			</div>
			<div className="content">
				<Card
					handleButton={() => handleShowModal({ show: true, edit: false })}
				/>
				{clients.map(client => (
					<Card
						handleButton={id => {
							history.push(`/dashboard/cliente/${id}/post`);
						}}
						key={client.id}
						name={client.name}
						logo={client.logo}
						id={client.id}
					/>
				))}
			</div>
			<span>Aprovando postagens desde 2021</span>
		</Container>
	);
};

export default DashBoard;
