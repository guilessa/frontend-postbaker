import { useContext } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Container from './styles';

import Button from '../../components/Button';
import { Context } from '../../services/context';

const PageBlock = () => {
	const history = useHistory();
	const { user } = useContext(Context);
	return (
		<Container>
			<div>
				<IoCloseCircleOutline size={48} color="#E35050" />
				{user?.email ? (
					<>
						<p>
							Sua forma de pagamento não foi aceita. Por favor clique no botão
							abaixo para tentar novamente.
						</p>

						<Button onClick={() => history.replace('configuracao')}>
							Ir para pagamentos
						</Button>
					</>
				) : (
					<p>
						Ocorreu um erro na conta. Por favor, entre em contato com o seu
						social media.
					</p>
				)}
			</div>
		</Container>
	);
};

export default PageBlock;
