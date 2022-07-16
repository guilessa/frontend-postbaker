import { useContext } from 'react';

import Container from './styles';

import { Context } from '../../services/context';

const SucessPopUp = () => {
	const { showPopUp } = useContext(Context);
	return (
		<Container show={showPopUp.show} type={showPopUp.type}>
			<p>{showPopUp.text}</p>
		</Container>
	);
};

export default SucessPopUp;
