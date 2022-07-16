import { useState } from 'react';

import Form from './Form';
import Container from './styles';
import Success from './Sucess';

const ForgetPassword = () => {
	const [sucessRequestPassword, setSucessRequestPassword] = useState(false);
	return (
		<Container>
			<div className="container_register" />
			<div className="content">
				{!sucessRequestPassword ? (
					<Form onPressButtonAfter={() => setSucessRequestPassword(true)} />
				) : (
					<Success />
				)}
				<span>Aprovando postagens desde 2021</span>
			</div>
		</Container>
	);
};

export default ForgetPassword;
