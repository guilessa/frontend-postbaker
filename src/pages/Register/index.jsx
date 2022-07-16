import { useFormik } from 'formik';
import pagarme from 'pagarme';
import { useContext, useState, useEffect } from 'react';

import InfoClient from './InfoClient';
import InfosForm from './InfosForm';
import PaymentForm from './PaymentForm';
import Container, { ProgressBar } from './styles';
import Success from './Success';

import api from '../../config/api';
import useCep from '../../hooks/useCep';
import { Context } from '../../services/context';
import registerSchema from '../../validations/registerSchema';

const initialValues = {
	name: '',
	email: '',
	phone: '',
	password: '',
	companyName: '',
	logo: null,
	passwordAccess: '',
	checkbox: false,
	instagram: false,
	facebook: false,
	linkedin: false,
	cardNumber: '',
	cardCode: '',
	cpf: '',
	cep: '',
	ddd: '',
	adress: '',
	number: '',
	state: '',
	city: '',
	district: '',
	phoneContact: '',
	cardName: '',
	vality: '',
	sigla: '',
};

const Register = () => {
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const { handleShowPopUp } = useContext(Context);

	const formik = useFormik({
		initialValues,
		validateOnBlur: true,
		validationSchema: registerSchema,
		onSubmit: async values => {
			if (loading) {
				return;
			}
			setLoading(true);
			let cardId = '';
			let apiKey = '';
			try {
				const response = await api.get('pagarme/api_key/');
				apiKey = response.data.apiKey;
			} catch {
				handleShowPopUp('error', 'erro, tente novamente');
				setLoading(false);
				return;
			}

			try {
				const cardValues = {
					card_number: values.cardNumber.match(/\d+/g).join(''),
					card_holder_name: values.cardName,
					card_expiration_date: values.vality.match(/\d+/g).join(''),
					card_cvv: values.cardCode,
				};
				const client = await pagarme.client.connect({
					api_key: apiKey,
				});
				cardId = await client.cards.create(cardValues);
			} catch (e) {
				handleShowPopUp('error', 'Verifique os dados do cartão');
				setLoading(false);
				return;
			}
			try {
				const request = {
					email: values.email,
					password: values.password,
					name: values.name,
					payment: [
						{
							address: [
								{
									cep: values.cep.match(/\d+/g).join(''),
									street: values.adress,
									number: values.number,
									city: values.city,
									stateUf: values.sigla,
									neighborhood: values.district,
								},
							],
							cardId: cardId.id,
						},
					],
				};
				if (values.phone) {
					request.phone = values.phone.match(/\d+/g).join('');
				}
				if (values.cpf) {
					request.cpf = values.cpf.match(/\d+/g).join('');
				}

				await api.post('users/', request);
			} catch (e) {
				handleShowPopUp('error', `Erro no cadastro:${e.response.data.detail}`);
				setLoading(false);
				return;
			}

			try {
				const responseLogin = await api.post('token/', {
					email: values.email,
					password: values.password,
				});
				window.localStorage.setItem(
					'token',
					JSON.stringify({
						acessToken: responseLogin.data.access,
						refreshToken: responseLogin.data.refresh,
					})
				);
				const formClient = new FormData();
				formClient.append('logo', values.logo);
				formClient.append('name', values.companyName);
				formClient.append('password', values.passwordAccess);
				formClient.append('instagram', values.instagram);
				formClient.append('facebook', values.facebook);
				formClient.append('linkedin', values.linkedin);
				await api.post('clients/', formClient);
				setLoading(false);
				setPage(3);
			} catch (e) {
				handleShowPopUp(
					'error',
					`Erro em adicionar o cliente:${e?.response?.data?.detail}`
				);
				setLoading(false);
			}
		},
	});

	const [cepValues, errorCep] = useCep(formik.values.cep);

	useEffect(() => {
		formik.setValues({
			...formik.values,
			adress: cepValues.logradouro,
			district: cepValues.neighborhood,
			city: cepValues.city,
			sigla: cepValues.state,
		});
	}, [cepValues]);

	async function verifyValues(ArrayFieldsNames, pageValue) {
		let notTouched = false;

		ArrayFieldsNames.forEach(field => {
			formik.setFieldTouched(field, true);
			if (
				(!formik.touched[field] && !formik.values[field]) ||
				formik.errors[field]
			) {
				notTouched = true;
			}
		});
		if (!formik.values.checkbox) {
			return;
		}

		if (!notTouched) {
			setPage(pageValue);
		}
	}

	return (
		<Container>
			<div className="container_register" />
			<div className="content">
				{page < 3 && (
					<ProgressBar>
						<button
							type="button"
							className={`${page > 0 ? 'pass' : ''}${
								page === 0 ? 'active' : ''
							}`}
							onClick={() => {
								if (page === 0) {
									return;
								}
								setPage(0);
							}}
						>
							<p>Cadastro</p>
							<span />
						</button>
						<button
							type="button"
							className={`${page > 1 ? 'pass' : ''}${
								page === 1 ? 'active' : ''
							}`}
							onClick={() => {
								if (page === 1) {
									return;
								}
								verifyValues(['name', 'email', 'phone', 'password'], 1);
							}}
						>
							<p>Cliente</p>
							<span />
						</button>
						<button
							type="button"
							className={`${page > 2 ? 'pass' : ''}${
								page === 2 ? 'active' : ''
							}`}
							onClick={() => {
								if (page === 2) {
									return;
								}
								verifyValues(
									[
										'name',
										'email',
										'phone',
										'password',
										'companyName',
										'passwordAccess',
										'logo',
									],
									2
								);
							}}
						>
							<p>Pagamento</p>
							<span />
						</button>
					</ProgressBar>
				)}
				<form onSubmit={formik.handleSubmit}>
					{page === 0 && (
						<InfosForm
							formik={formik}
							onPressButton={() =>
								verifyValues(['name', 'email', 'phone', 'password'], 1)
							}
						/>
					)}

					{page === 1 && (
						<InfoClient
							formik={formik}
							onPressButton={() =>
								verifyValues(['companyName', 'passwordAccess', 'logo'], 2)
							}
						/>
					)}

					{page === 2 && (
						<PaymentForm
							formik={formik}
							onPressButtonFinished={() => {
								formik.handleSubmit();
							}}
							cepError={errorCep}
							loading={loading}
						/>
					)}
				</form>

				{page === 3 && <Success />}
				<span>Aprovando postagens desde 2021</span>
			</div>
		</Container>
	);
};

export default Register;
