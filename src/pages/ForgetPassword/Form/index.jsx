import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Container from './styles';

import Button from '../../../components/Button';
import api from '../../../config/api';
import { Context } from '../../../services/context';
import forgetPasswordSchema from '../../../validations/forgetPasswordSchema';

const initialValues = {
	email: '',
};

const ForgetPassword = ({ onPressButtonAfter }) => {
	const [loading, setLoading] = useState(false);
	const { handleShowPopUp } = useContext(Context);
	const formik = useFormik({
		initialValues,
		validationSchema: forgetPasswordSchema,
		onSubmit: async values => {
			if (loading) {
				return;
			}
			setLoading(true);
			try {
				await api.post('users/recover-password', {
					email: values.email,
				});
				setLoading(false);
				onPressButtonAfter();
				handleShowPopUp('sucess', 'Enviado');
			} catch (e) {
				setLoading(false);
				handleShowPopUp('error', 'Erro, tente Novamente');
			}
		},
	});

	return (
		<Container>
			<h1>Esqueci minha senha</h1>
			<p>
				Preencha o campo abaixo com o seu email cadastrado aqui no Post Baker
				para recuperar a sua senha.
			</p>
			<form onSubmit={formik.handleSubmit}>
				<fieldset>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
				</fieldset>
				<div className="container_buttons">
					<div className="container_forget">
						<Link to="/login">Voltar para a tela de login</Link>
					</div>
					<Button type="submit" className="button" loading={loading}>
						Recuperar senha
					</Button>
				</div>
			</form>
		</Container>
	);
};

ForgetPassword.propTypes = {
	onPressButtonAfter: PropTypes.func.isRequired,
};

export default ForgetPassword;
