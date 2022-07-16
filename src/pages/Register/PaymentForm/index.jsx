import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import Container from './styles';

import creditCard from '../../../assets/icons/credit-card.svg';
import creditCardTwo from '../../../assets/icons/credit-card2.png';
import Button from '../../../components/Button';
import maskCardNumber from '../../../utils/maskCardNumber';
import maskCep from '../../../utils/maskCep';
import maskCpf from '../../../utils/maskCpf';
import maskDate from '../../../utils/maskDate';
import { ContainerButtons, FormContainer } from '../styles';

const PaymentForm = ({ formik, loading, cepError }) => {
	const [states, setStates] = useState([]);

	useEffect(() => {
		if (!formik.values.state) {
			return;
		}
		const uf = states.find(state => state.nome === formik.values.state);
		if (!uf) {
			return;
		}

		formik.setFieldValue('sigla', uf.sigla);
	}, [formik.values.state]);

	useEffect(() => {
		if (!formik.values.sigla) {
			return;
		}
		const uf = states.find(state => state.sigla === formik.values.sigla);
		if (!uf) {
			return;
		}

		formik.setFieldValue('state', uf.nome);
	}, [formik.values.sigla, states]);

	useEffect(() => {
		async function getStates() {
			const { data } = await axios.get(
				'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
			);
			setStates(data);
			if (data[0] && !formik.values.state) {
				formik.setFieldValue('state', data[0].nome);
			}
		}

		getStates();
	}, []);

	return (
		<Container>
			<h1>Informações de pagamento</h1>
			<p>
				O ambiente é 100% seguro. Não revelaremos a ninguém nenhuma informação
				de pagamento ou quaisquer outra informação que tenha inserido na Social
				Pipe.
			</p>
			<div>
				<FormContainer>
					<fieldset>
						<label htmlFor="Cep">Cep</label>
						<input
							id="Cep"
							name="cep"
							placeholder="21020-020"
							onChange={e =>
								maskCep(e.target.value, newValue =>
									formik.setFieldValue('cep', newValue)
								)
							}
							className={
								(!!formik.errors?.cep && formik.touched.cep) || cepError
									? 'error'
									: ''
							}
							autoComplete="postal-code"
							value={formik.values.cep}
						/>
						{((!!formik.errors?.cep && formik.touched.cep) || cepError) && (
							<span>Campo Obrigatório</span>
						)}
					</fieldset>
					<fieldset>
						<label htmlFor="Adress">Endereço</label>
						<input
							placeholder="Avenida Alameda"
							id="Adress"
							name="adress"
							onChange={formik.handleChange}
							value={formik.values.adress}
							className={
								!!formik.errors?.adress && formik.touched.adress ? 'error' : ''
							}
						/>
						{!!formik.errors?.adress && formik.touched.adress && (
							<span>Campo Obrigatório</span>
						)}
					</fieldset>
					<div className="row">
						<fieldset>
							<label htmlFor="Num">Numero</label>
							<input
								id="Num"
								name="number"
								onChange={formik.handleChange}
								className={
									!!formik.errors?.number && formik.touched.number
										? 'error'
										: ''
								}
								value={formik.values.number}
							/>
							{!!formik.errors?.number && formik.touched.number && (
								<span>Campo Obrigatório</span>
							)}
						</fieldset>

						<div className="select">
							<label>Estado</label>
							<div>
								<div
									className={`mask ${
										!!formik.errors?.state && formik.touched.state
											? 'error'
											: ''
									}`}
								>
									<p>{formik.values.state}</p>
									<MdKeyboardArrowDown size={32} color="#717171" />
								</div>
								<select
									defaultValue={formik.values.state}
									onChange={e => formik.setFieldValue('state', e.target.value)}
								>
									{states.map(state => (
										<option value={state.nome} key={state.id}>
											{state.nome}
										</option>
									))}
								</select>
							</div>
							{!!formik.errors?.state && formik.touched.state && (
								<span>Campo Obrigatório</span>
							)}
						</div>
					</div>
					<div className="row">
						<fieldset>
							<label htmlFor="city">Cidade</label>
							<input
								id="city"
								name="city"
								className={
									!!formik.errors?.city && formik.touched.city ? 'error' : ''
								}
								onChange={formik.handleChange}
								value={formik.values.city}
							/>
							{!!formik.errors?.city && formik.touched.city && (
								<span>Campo Obrigatório</span>
							)}
						</fieldset>
						<fieldset>
							<label htmlFor="Bairro">Bairro</label>
							<input
								id="Bairro"
								name="district"
								className={
									!!formik.errors?.district && formik.touched.district
										? 'error'
										: ''
								}
								onChange={formik.handleChange}
								value={formik.values.district}
							/>
							{!!formik.errors?.district && formik.touched.district && (
								<span>Campo Obrigatório</span>
							)}
						</fieldset>
					</div>
					{/* <div className="contact">
						<h3>Informações de contato</h3>
						<div className="row ">
							<fieldset>
								<label htmlFor="DDD">DDD</label>
								<input
									id="DDD"
									name="ddd"
									placeholder="12"
									maxLength={2}
									autoComplete="tel-area-code"
									onChange={handleDDD}
									value={formik.values.ddd}
								/>
							</fieldset>
							<fieldset>
								<label htmlFor="phone2">Número de celular</label>
								<input
									placeholder="00000-0000"
									id="phone2"
									autoComplete="tel-local"
									name="phoneContact"
									onChange={e =>
										maskPhone(
											e.target.value,
											newValue =>
												formik.setFieldValue('phoneContact', newValue),
											{ ddd: false }
										)
									}
									value={formik.values.phoneContact}
								/>
							</fieldset>
						</div>
					</div> */}
					<div className="payment">
						<h3>Informações finais</h3>
						<fieldset>
							<label htmlFor="cpf">CPF</label>
							<input
								className={
									!!formik.errors?.cpf && formik.touched.cpf ? 'error' : ''
								}
								placeholder="xxx.xxx-xxx-xx"
								id="cpf"
								name="cpf"
								value={formik.values.cpf}
								onChange={e =>
									maskCpf(e.target.value, value =>
										formik.setFieldValue('cpf', value)
									)
								}
							/>
							{!!formik.errors?.cpf && formik.touched.cpf && (
								<span>Campo Obrigatório</span>
							)}
						</fieldset>
						<fieldset>
							<label htmlFor="cardNumber">Número do cartão</label>
							<div
								className={`card ${
									!!formik.errors?.cardNumber && formik.touched.cardNumber
										? 'error'
										: ''
								}`}
							>
								<input
									type="text"
									placeholder="0000 0000 0000 0000"
									id="cardNumber"
									name="cardNumber"
									autoComplete="cc-number"
									onBlur={formik.handleBlur}
									value={formik.values.cardNumber}
									onChange={e =>
										maskCardNumber(e.target.value, newValue =>
											formik.setFieldValue('cardNumber', newValue)
										)
									}
								/>
								<img src={creditCardTwo} alt="credit icon" />
							</div>
							{!!formik.errors?.cardNumber && formik.touched.cardNumber && (
								<span>Campo Obrigatório</span>
							)}
						</fieldset>
						<fieldset>
							<label htmlFor="cardName">Nome (exatamente como no cartão)</label>
							<input
								autoComplete="cc-name"
								id="cardName"
								placeholder="EX: TITO LIMA"
								autoCapitalize="true"
								className={`cardName ${
									!!formik.errors?.cardName && formik.touched.cardName
										? 'error'
										: ''
								}`}
								name="cardName"
								onChange={formik.handleChange}
								value={formik.values.cardName}
							/>
							{!!formik.errors?.cardName && formik.touched.cardName && (
								<span>Campo Obrigatório</span>
							)}
						</fieldset>
						<fieldset>
							<label htmlFor="vality">Validade</label>
							<input
								placeholder="Ex: 11/23"
								id="vality"
								className={
									!!formik.errors?.vality && formik.touched.vality
										? 'error'
										: ''
								}
								name="vality"
								onChange={e => {
									maskDate(e.target.value, value =>
										formik.setFieldValue('vality', value)
									);
								}}
								value={formik.values.vality}
							/>
							{!!formik.errors?.vality && formik.touched.vality && (
								<span>Campo Obrigatório</span>
							)}
						</fieldset>
						<fieldset>
							<label htmlFor="cardCode">Código de segurança</label>
							<div
								className={`card ${
									!!formik.errors?.cardCode && formik.touched.cardCode
										? 'error'
										: ''
								}`}
							>
								<input
									placeholder="123"
									type="text"
									id="cardCode"
									name="cardCode"
									autoComplete="cc-csc"
									onBlur={formik.handleBlur}
									value={formik.values.cardCode}
									onChange={e => {
										const valueNumber = e.target.value.match(/\d+/g)?.join('');
										if (!valueNumber || valueNumber?.length > 3) {
											formik.setFieldValue('cardCode', '');
											return;
										}
										formik.setFieldValue('cardCode', valueNumber);
									}}
									maxLength={3}
								/>
								<img src={creditCard} alt="credit-card" />
							</div>
							{!!formik.errors?.cardCode && formik.touched.cardCode && (
								<span>Campo Obrigatório</span>
							)}
						</fieldset>
					</div>
					<ContainerButtons className="container_buttons">
						<Button
							type="onSubmit"
							className="button"
							loading={loading}
							disabled={cepError}
						>
							Finalizar cadastro
						</Button>
						<div className="container_forget" />
					</ContainerButtons>
				</FormContainer>
			</div>
		</Container>
	);
};

PaymentForm.propTypes = {
	formik: PropTypes.object.isRequired,
};

export default PaymentForm;
