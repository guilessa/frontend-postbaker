import Container from './styles';

import Button from '../../components/Button';

const DesactiveSucess = () => (
	<Container>
		<div>
			<h1>Sua conta foi desativada!</h1>
			<p>
				Sua conta foi finalizada, e seus dados foram todos apagados. A partir de
				agora você não receberá mais nenhum tipo de cobrança da Social Pipe.
			</p>
			<p>Mas, temos esperança de que teremos você com a gente novamente!</p>
			<Button>Enviar feedback pelo WhatsApp</Button>
		</div>
	</Container>
);

export default DesactiveSucess;
