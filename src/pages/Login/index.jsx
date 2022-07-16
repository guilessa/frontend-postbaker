import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Container from './styles';

import Button from '../../components/Button';
import api from '../../config/api';
import { Context } from '../../services/context';
import loginSchema from '../../validations/loginSchema';

const initialValues = {
	email: '',
	password: '',
};

const Login = () => {
	const { handleShowPopUp } = useContext(Context);
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const formik = useFormik({
		initialValues,
		validationSchema: loginSchema,
		onSubmit: async values => {
			if (loading) {
				return;
			}

			try {
				setLoading(true);
				const { data } = await api.post('token/', {
					email: values.email,
					password: values.password,
				});
				window.localStorage.setItem(
					'token',
					JSON.stringify({
						acessToken: data.access,
						refreshToken: data.refresh,
					})
				);
				history.replace('/dashboard');
			} catch (e) {
				handleShowPopUp(
					'error',
					'Usuário ou senha estão incorretos. Caso tenha esquecido acesse "Esqueci minha senha"'
				);
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<Container>
			<div className="container_register" />
			<div className="content">
				<div className="container_form">
					<h1>Faça o login na sua conta</h1>
					<form onSubmit={formik.handleSubmit}>
						<fieldset>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
						</fieldset>
						<fieldset>
							<label htmlFor="password">Senha</label>
							<input
								type="password"
								id="password"
								autoComplete="current-password"
								name="password"
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</fieldset>
						<div className="container_buttons">
							<Button type="submit" loading={loading} className="button">
								Fazer login
							</Button>
							<div className="container_forget">
								<Link to="/login/esqueciSenha">Esqueci minha senha</Link>
							</div>
						</div>
					</form>
				</div>
				<span>Aprovando postagens desde 2021</span>
			</div>
		</Container>
	);
};

export default Login;
