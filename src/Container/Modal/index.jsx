import PropTypes from 'prop-types';

import Container from './styles';

const Modal = ({ children, handleOutClick, showModal, background }) => (
	<Container show={showModal} background={background}>
		<span tabIndex="0" onClick={handleOutClick} />
		{children}
	</Container>
);

Modal.propTypes = {
	handleOutClick: PropTypes.func.isRequired,
	showModal: PropTypes.bool.isRequired,
	background: PropTypes.bool,
	children: PropTypes.element.isRequired,
};

Modal.defaultProps = {
	background: true,
};

export default Modal;
