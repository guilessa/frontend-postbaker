import { Link } from 'react-router-dom';

import Container from './styles';

import Button from '../../../components/Button';
import { ContainerButtons } from '../styles';

const success = () => (
	<Container>
		<h1>Sucesso!</h1>
		<p>
			Seu cadastro foi finalizado e seu pagamento foi aprovado com sucesso. A
			partir de agora você tem acesso ao Post Baker! Seja bem-vindo(a),
			aproveite!
		</p>
		<ContainerButtons className="container_buttons">
			<Link to="/login" className="button">
				<Button>Fazer Login</Button>
			</Link>
			<div className="container_forget" />
		</ContainerButtons>
	</Container>
);

export default success;
