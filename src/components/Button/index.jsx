import { AiOutlineLoading } from 'react-icons/ai';

import Container from './styles';

const Button = ({ children, loading, ...rest }) => (
	<Container {...rest}>
		{loading ? (
			<AiOutlineLoading className="loading" size={24} color="#fff" />
		) : (
			children
		)}
	</Container>
);

export default Button;
