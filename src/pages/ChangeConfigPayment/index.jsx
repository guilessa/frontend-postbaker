import { useFormik } from 'formik';
import jwtDecode from 'jwt-decode';
import pagarme from 'pagarme';
import { useContext, useState } from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import Container, { FieldSet, Form } from './styles';

import creditCard from '../../assets/icons/credit-card.svg';
import creditCardTwo from '../../assets/icons/credit-card2.png';
import Button from '../../components/Button';
import api from '../../config/api';
import { Context } from '../../services/context';
import maskCardNumber from '../../utils/maskCardNumber';
import maskDate from '../../utils/maskDate';
import configPaymentSchema from '../../validations/configPaymentSchema';

const initialValues = {
	name: '',
	numberCard: '',
	vality: '',
	codeCard: '',
};

const ChangeConfigPayment = () => {
	const { handleShowPopUp, user } = useContext(Context);
	const [loading, setLoading] = useState(false);
	const formik = useFormik({
		initialValues,
		async onSubmit(values) {
			setLoading(true);
			const cardValues = {
				card_number: values.numberCard.match(/\d+/g).join(''),
				card_holder_name: values.name,
				card_expiration_date: values.vality.match(/\d+/g).join(''),
				card_cvv: values.codeCard,
			};
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
				const client = await pagarme.client.connect({
					api_key: apiKey,
				});
				const cardId = await client.cards.create(cardValues);

				const tokenStorage = JSON.parse(window.localStorage.getItem('token'));

				if (!tokenStorage?.acessToken) {
					setLoading(false);
					return;
				}

				const content = jwtDecode(tokenStorage?.acessToken);
				await api.patch(`users/${content.user_id}/`, {
					...user,
					payment: [
						{
							...user.payment[0],
							cardId: cardId.id,
						},
					],
				});
				handleShowPopUp('sucess', 'Informações Atualizadas!');
			} catch {
				handleShowPopUp('error', 'Tente Novamente');
			} finally {
				setLoading(false);
			}
		},
		validationSchema: configPaymentSchema,
	});

	return (
		<Container>
			<div className="container">
				<div className="header">
					<Link to="/dashboard">
						<RiArrowLeftSLine size={32} color="#EE4266" />
						<p>Voltar para o dashboard</p>
					</Link>
					<h2>Alterar informações de pagamento</h2>
				</div>
				<div className="content">
					<Form onSubmit={formik.handleSubmit}>
						<FieldSet>
							<label htmlFor="numberCard">Número do cartão</label>
							<div className="card">
								<input
									type="text"
									placeholder="0000 0000 0000 0000"
									id="cardNumber"
									name="cardNumber"
									autoComplete="cc-number"
									value={formik.values.numberCard}
									onChange={e =>
										maskCardNumber(e.target.value, newValue =>
											formik.setFieldValue('numberCard', newValue)
										)
									}
								/>
								<img src={creditCardTwo} alt="credit icon" />
							</div>
						</FieldSet>
						<FieldSet>
							<label htmlFor="name">Nome (exatamente como no cartão)</label>
							<input
								type="name"
								id="name"
								className="cardName"
								name="name"
								autoCapitalize="true"
								placeholder="EX: TITO LIMA"
								autoComplete="name"
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
						</FieldSet>

						<FieldSet>
							<label htmlFor="vality">Validade</label>
							<input
								id="vality"
								name="vality"
								placeholder="Ex: 11/23"
								value={formik.values.vality}
								onChange={e =>
									maskDate(e.target.value, newValue =>
										formik.setFieldValue('vality', newValue)
									)
								}
							/>
						</FieldSet>
						<FieldSet>
							<label htmlFor="codeCard">Código de segurança</label>
							<div className="card">
								<input
									type="text"
									id="cardCode"
									name="codeCard"
									placeholder="123"
									autoComplete="cc-csc"
									onBlur={formik.handleBlur}
									value={formik.values.codeCard}
									onChange={e => {
										const valueNumber = e.target.value.match(/\d+/g)?.join('');
										if (!valueNumber || valueNumber?.length > 3) {
											formik.setFieldValue('codeCard', '');
											return;
										}
										formik.setFieldValue('codeCard', valueNumber);
									}}
									maxLength={3}
								/>
								<img src={creditCard} alt="credit-card" />
							</div>
						</FieldSet>

						<Button
							type="button"
							loading={loading}
							onClick={() => {
								if (loading) {
									return;
								}
								formik.handleSubmit();
							}}
						>
							Salvar informações
						</Button>
					</Form>
				</div>

				<span>Aprovando postagens desde 2021</span>
			</div>
		</Container>
	);
};

export default ChangeConfigPayment;
