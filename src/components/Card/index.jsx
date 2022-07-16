import PropTypes from 'prop-types';
import { HiPlusSm } from 'react-icons/hi';

import Container from './styles';

const Card = ({ name, id, logo, handleButton }) => (
	<Container type="button" onClick={() => handleButton(id)} existproduct={name}>
		{name ? (
			<>
				<img src={logo} alt="logo" />
				<p>{name}</p>
			</>
		) : (
			<>
				<HiPlusSm color="#fff" size={40} />
				<p>adicionar cliente</p>
			</>
		)}
	</Container>
);

Card.propTypes = {
	name: PropTypes.string,
	id: PropTypes.number,
	logo: PropTypes.string,
	handleButton: PropTypes.func.isRequired,
};

Card.defaultProps = {
	name: '',
	id: -1,
	logo: '',
};

export default Card;
