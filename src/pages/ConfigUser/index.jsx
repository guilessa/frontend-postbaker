import axios from 'axios';
import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { useFormik } from 'formik';
import jwtDecode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import Container, { FieldSet, Info, Form, Payment } from './styles';

import Button from '../../components/Button';
import api from '../../config/api';
import useCep from '../../hooks/useCep';
import { Context } from '../../services/context';
import maskCep from '../../utils/maskCep';
import maskCpf from '../../utils/maskCpf';
import maskPhone from '../../utils/maskPhone';
import configUserSchema from '../../validations/configUserSchema';

const initialValues = {
	name: '',
	email: '',
	phone: '',
	cpf: '',
	password: '',
	cep: '',
	adress: '',
	number: '',
	city: '',
	state: '',
	bairro: '',
	ddd: '',
	phoneContact: '',
	sigla: '',
};

const typesOfTransactions = {
	PAID: 'Pago',
	CANCELED: 'Cancelado',
	AUTHORIZED: 'Autorizada',
	PROCESSING: 'Processando',
	REFUNDED: 'Estornada',
	WAITING_PAYMENT: 'Aguardando pagamento',
	PENDING_REFUND: 'Agurdando confirmação do estorno',
	REFUSED: 'Recusada',
	CHARGEDBACK: 'Transação sofreu chargeback',
	ANALYZING: 'Analise Manual',
	PENDING_REVIEW: 'Transação pendente de revisão manual',
};

const ConfigUser = () => {
	const { user, addUser, handleShowPopUp } = useContext(Context);
	const [states, setStates] = useState([]);
	const [loading, setLoading] = useState(false);
	const [payments, setPayments] = useState({
		payments: [],
	});

	const formik = useFormik({
		initialValues,
		async onSubmit(values) {
			const tokenStorage = JSON.parse(window.localStorage.getItem('token'));

			if (!tokenStorage?.acessToken) {
				return;
			}
			setLoading(true);

			const content = jwtDecode(tokenStorage?.acessToken);
			const variables = {
				email: values.email,
				name: values.name,
				cpf: values.cpf.match(/\d+/g).join(''),
				phone: values.phone.match(/\d+/g).join(''),
				payment: [
					{
						address: [
							{
								cep: values.cep.match(/\d+/g).join(''),
								street: values.adress,
								number: values.number,
								city: values.city,
								stateUf: values.sigla,
								neighborhood: values.bairro,
							},
						],
						cardId: user.payment[0].cardId,
					},
				],
			};
			if (values.password) {
				variables.password = values.password;
			}
			try {
				const response = await api.patch(
					`users/${content.user_id}/`,
					variables
				);
				addUser(response.data);
				handleShowPopUp('sucess', 'Dados Atualizados!');
			} catch (e) {
				if (!e.response) {
					handleShowPopUp('error', 'Verifique a sua conexão');
					return;
				}
				if (e.response.status === 500) {
					handleShowPopUp('error', 'Erro de servidor');
					return;
				}
				handleShowPopUp('error', 'Tente Novamente');
			} finally {
				setLoading(false);
			}
		},
		validationSchema: configUserSchema,
	});

	const [cepValues, errorCep] = useCep(formik.values.cep);

	useEffect(() => {
		formik.setValues({
			...formik.values,
			adress: cepValues.logradouro || user.payment[0].address[0].street,
			bairro: cepValues.neighborhood || user.payment[0].address[0].neighborhood,
			city: cepValues.city || user.payment[0].address[0].city,
			sigla: cepValues.state || user.payment[0].address[0].stateUf,
		});
	}, [cepValues]);

	useEffect(() => {
		if (!formik.values.sigla) {
			return;
		}
		const uf = states.find(state => state.sigla === formik.values.sigla);

		if (!uf || uf.nome === formik.values.state) {
			return;
		}

		formik.setFieldValue('state', uf.nome);
	}, [formik.values.sigla, states]);

	useEffect(() => {
		async function getStates() {
			const { data } = await axios.get(
				'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
			);
			if (
				data[0] &&
				!formik.values.state &&
				!user.payment[0]?.address[0]?.stateUf
			) {
				formik.setFieldValue('state', data[0].nome);
				formik.setFieldValue('sigla', data[0].sigla);
			}

			let phone = '';
			let cpf = '';
			let cep = '';

			maskPhone(user.phone, newValue => {
				phone = newValue;
			});
			maskCpf(user.cpf, newValue => {
				cpf = newValue;
			});

			maskCep(user.payment[0].address[0].cep, newValue => {
				cep = newValue;
			});

			await formik.setValues({
				...formik.values,
				adress: user.payment[0].address[0].street,
				bairro: user.payment[0].address[0].neighborhood,
				cep,
				city: user.payment[0].address[0].city,
				cpf,
				email: user.email,
				name: user.name,
				number: user.payment[0].address[0].number,
				phone,
				sigla: user.payment[0].address[0].stateUf,
			});
			setStates(data);
		}

		getStates();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const tokenStorage = JSON.parse(window.localStorage.getItem('token'));

			if (!tokenStorage?.acessToken) {
				return;
			}

			const content = jwtDecode(tokenStorage?.acessToken);
			try {
				const response = await api.get(
					`users/${content.user_id}/transactions/`
				);
				let paymentTotal = 0;

				const paymentsRefactorre = response.data.map(payment => {
					paymentTotal += Number(payment.price);
					const status = typesOfTransactions[payment.status];

					return {
						...payment,
						price: `R$ ${payment.price.replace('.', ',')}`,
						dataFormat: format(
							parseISO(payment.createdAt),
							"'em' MMMM 'de' yyyy",
							{
								locale: ptBr,
							}
						),
						statusFormat: status,
					};
				});
				const totalFormat = `R$ ${paymentTotal
					.toFixed(2)
					.toString()
					.replace('.', ',')}`;
				setPayments({
					total: paymentTotal,
					payments: paymentsRefactorre,
					totalFormat,
				});
			} catch {}
		}
		fetchData();
	}, []);

	return (
		<Container>
			<div className="container">
				<div className="header">
					<Link to="/dashboard">
						<RiArrowLeftSLine size={32} color="#EE4266" />
						<p>Voltar para o dashboard</p>
					</Link>
					<h2>Meu painel</h2>
				</div>
				<div className="content">
					<Form onSubmit={formik.handleSubmit}>
						<div>
							<div className="column">
								<h2>Informações de cadastro</h2>
								<FieldSet>
									<label htmlFor="Name">Nome</label>
									<input
										placeholder="Usuário Teste"
										type="text"
										id="Name"
										name="name"
										autoComplete="name"
										onChange={formik.handleChange}
										value={formik.values.name}
									/>
								</FieldSet>
								<FieldSet>
									<label htmlFor="email">Email</label>
									<input
										placeholder="usuário@teste.com"
										type="email"
										id="email"
										name="email"
										autoComplete="email"
										onChange={formik.handleChange}
										value={formik.values.email}
									/>
								</FieldSet>

								<FieldSet>
									<label htmlFor="phone">Celular</label>
									<input
										placeholder="(12) 00000-0000"
										autoComplete="tel-national"
										type="tel"
										id="phone"
										name="phone"
										value={formik.values.phone}
										onChange={e =>
											maskPhone(e.target.value, newValue =>
												formik.setFieldValue('phone', newValue)
											)
										}
									/>
								</FieldSet>
								<FieldSet>
									<label htmlFor="cpf">CPF</label>
									<input
										id="cpf"
										placeholder="xxx.xxx-xxx-xx"
										name="cpf"
										onChange={e =>
											maskCpf(e.target.value, newValue =>
												formik.setFieldValue('cpf', newValue)
											)
										}
										value={formik.values.cpf}
									/>
								</FieldSet>
								<FieldSet>
									<label htmlFor="password">Senha</label>
									<input
										type="password"
										id="password"
										placeholder="**********"
										name="password"
										autoComplete="current-password"
										onChange={formik.handleChange}
										value={formik.values.password}
									/>
								</FieldSet>
							</div>
							<div className="column">
								<h2>Endereço de cobrança</h2>
								<FieldSet>
									<label htmlFor="Cep">Cep</label>
									<input
										placeholder="21020-020"
										id="Cep"
										name="cep"
										onChange={e =>
											maskCep(e.target.value, newValue =>
												formik.setFieldValue('cep', newValue)
											)
										}
										autoComplete="postal-code"
										value={formik.values.cep}
									/>
								</FieldSet>
								<FieldSet>
									<label htmlFor="Adress">Endereço</label>
									<input
										placeholder="Avenida Alameda"
										id="Adress"
										name="adress"
										onChange={formik.handleChange}
										value={formik.values.adress}
									/>
								</FieldSet>
								<div className="row">
									<FieldSet>
										<label htmlFor="Num">Numero</label>
										<input
											id="Num"
											name="number"
											onChange={formik.handleChange}
											value={formik.values.number}
										/>
									</FieldSet>

									<div className="select">
										<label>Estado</label>
										<div>
											<div className="mask">
												<p>{formik.values.state}</p>
												<MdKeyboardArrowDown size={32} color="#717171" />
											</div>
											<select
												onChange={e =>
													formik.setFieldValue('state', e.target.value)
												}
											>
												{states.map(state => (
													<option value={state.nome} key={state.id}>
														{state.nome}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<FieldSet>
										<label htmlFor="city">Cidade</label>
										<input
											id="city"
											name="city"
											onChange={formik.handleChange}
											value={formik.values.city}
										/>
									</FieldSet>
									<FieldSet>
										<label htmlFor="Bairro">Bairro</label>
										<input
											id="Bairro"
											name="bairro"
											onChange={formik.handleChange}
											value={formik.values.bairro}
										/>
									</FieldSet>
								</div>
							</div>
							{/* <div className="contact">
								<h3>Informações de contato</h3>
								<div className="row ">
									<FieldSet>
										<label htmlFor="DDD">DDD</label>
										<input
											placeholder="12"
											id="DDD"
											name="ddd"
											maxLength={2}
											autoComplete="tel-country-code"
											onChange={handleDDD}
											value={formik.values.ddd}
										/>
									</FieldSet>
									<FieldSet>
										<label htmlFor="phone2">Número de celular</label>
										<input
											id="phone2"
											autoComplete="tel-national"
											name="phoneContact"
											placeholder="00000-0000"
											onChange={e =>
												maskPhone(
													e.target.value,
													newValue =>
														formik.setFieldValue('phoneContact', newValue),
													{
														ddd: false,
													}
												)
											}
											value={formik.values.phoneContact}
										/>
									</FieldSet>
								</div>
							</div> */}
						</div>
						<Button
							type="button"
							secondary
							loading={loading}
							disabled={errorCep}
							onClick={() => {
								if (loading) {
									return;
								}

								formik.handleSubmit();
							}}
						>
							Alterar informações
						</Button>
					</Form>
					<Info>
						<h3>Valor atual de assinatura</h3>
						<p className="price">{payments.totalFormat}</p>
						<h3>Histórico de Pagamentos</h3>
						<div className="history">
							{payments.payments.map(payment => (
								<Payment status={payment.status} key={payment.pagarmeId}>
									<p>
										<strong>{payment.price}</strong> {payment.dataFormat}
									</p>
									<span />
									<div>{payment.statusFormat}</div>
								</Payment>
							))}
						</div>
						<div className="container_buttons">
							<Link to="pagamentoConfiguracao" className="edit">
								Alterar informação de pagamento
							</Link>
							<Link to="desativarConta" className="desactive">
								Desativar conta
							</Link>
						</div>
					</Info>
				</div>

				<span>Aprovando postagens desde 2021</span>
			</div>
		</Container>
	);
};

export default ConfigUser;
