import jwtDecode from 'jwt-decode';
import { useContext } from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';

import Container from './styles';

import api from '../../config/api';
import { Context } from '../../services/context';

const DesactiveAccount = () => {
	const history = useHistory();
	const { handleShowPopUp } = useContext(Context);
	return (
		<Container>
			<div className="container">
				<div className="header">
					<Link to="/dashboard">
						<RiArrowLeftSLine size={32} color="#EE4266" />
						<p>Voltar para o dashboard</p>
					</Link>
					<h2>Desativar conta</h2>
				</div>
				<div className="content">
					<h3>Tem certeza de que você quer desativar sua conta?</h3>
					<div className="container_buttons">
						<button type="button" className="edit">
							Alterar informação de pagamento
						</button>
						<button
							onClick={async () => {
								const tokenStorage = JSON.parse(
									window.localStorage.getItem('token')
								);
								const content = jwtDecode(tokenStorage?.acessToken);
								try {
									await api.delete(`users/${content.user_id}/`);
									window.localStorage.clear();
									history.push('/login/contaDesativada');
								} catch {
									handleShowPopUp('error', 'Tente Novamente');
								}
							}}
							type="button"
							className="desactive"
						>
							Desativar conta
						</button>
					</div>
				</div>
				<span>Aprovando postagens desde 2021</span>
			</div>
		</Container>
	);
};

export default DesactiveAccount;
