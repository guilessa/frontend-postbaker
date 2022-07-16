import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

import Container from './styles';

import api from '../../config/api';
import { Context } from '../../services/context';
import editOrNewClientSchema from '../../validations/editOrNewClientSchema';
import Button from '../Button';
import PhotoContainer from '../PhotoContainer';

const initialValues = {
	name: '',
	password: '',
	instagram: false,
	facebook: false,
	linkedin: false,
	logo: null,
	edit: false,
};

const NewClient = ({ saveClient, editClient, handleClose, erroClient }) => {
	const [loading, setLoading] = useState(false);
	const { handleShowPopUp, showModal } = useContext(Context);
	const formik = useFormik({
		initialValues,
		validateOnBlur: true,
		onSubmit: async (values, { resetForm }) => {
			if (values.logo === null && !editClient?.client?.logo) {
				return;
			}
			if (loading) {
				return;
			}
			setLoading(true);
			const formData = new FormData();
			formData.append('name', values.name);
			formData.append('instagram', values.instagram);
			formData.append('facebook', values.facebook);
			formData.append('linkedin', values.linkedin);
			formData.append('linkedin', values.linkedin);
			formData.append('password ', values.password);
			if (formik.values.logo) {
				formData.append('logo', values.logo);
			}
			try {
				if (editClient.edit) {
					await api.patch(`clients/${editClient.client.accessHash}/`, formData);
				} else {
					await api.post('clients/', formData);
				}
				handleShowPopUp('sucess', 'Client Cadastrado');
				resetForm();
				saveClient();
			} catch (e) {
				erroClient(e);
				if (!e.response) {
					handleShowPopUp('error', 'Erro de Conexão');
					setLoading(false);
					return;
				}
				handleShowPopUp(
					'error',
					`Erro ao cadastrar cliente:${e?.response?.data?.detail}`
				);
			}
			setLoading(false);
		},
		validationSchema: editOrNewClientSchema,
	});

	useEffect(() => {
		if (!showModal.show) {
			formik.resetForm(initialValues);
		}
	}, [showModal]);

	useEffect(() => {
		if (!editClient.edit || !showModal.show) {
			return;
		}
		formik.setFieldValue('edit', editClient.edit);
		formik.setFieldValue('name', editClient.client.name);
		formik.setFieldValue('facebook', editClient.client.facebook);
		formik.setFieldValue('instagram', editClient.client.instagram);
		formik.setFieldValue('linkedin', editClient.client.linkedin);
	}, [editClient]);

	return (
		<Container>
			<button
				type="button"
				className="close_button"
				onClick={() => {
					formik.resetForm();
					handleClose();
				}}
			>
				<IoMdClose size={24} color="#fff" />
			</button>
			<header className="header_container">
				{editClient.edit ? <h3>Editar cliente</h3> : <h3>Novo cliente</h3>}
				{editClient.edit && (
					<>
						<button
							className="secondary"
							type="button"
							onClick={() =>
								editClient.client.deleteItem(
									editClient.client.accessHash,
									editClient.client.name
								)
							}
						>
							Apagar cliente
						</button>
						<Button
							loading={loading}
							onClick={formik.handleSubmit}
							type="button"
						>
							Salvar alterações
						</Button>
					</>
				)}
			</header>
			<form onSubmit={formik.handleSubmit}>
				<div>
					<div className="photo_container">
						<p>Logo da empresa</p>
						<div>
							{editClient?.client?.logo && !formik.values.logo && (
								<img src={`${editClient.client.logo}`} alt="logo" />
							)}
							<PhotoContainer
								value={formik.values.logo}
								handleChange={file => formik.setFieldValue('logo', file)}
							/>
						</div>
					</div>
					<div className="inputs_container">
						<fieldset>
							<label htmlFor="name">Nome da empresa</label>
							<input
								type="text"
								id="name"
								name="name"
								onBlur={formik.handleBlur}
								className={
									!!formik.errors?.name && formik.touched.name ? 'error' : ''
								}
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
						</fieldset>
						<fieldset>
							<label htmlFor="password">Senha de acesso do cliente</label>
							<input
								onBlur={formik.handleBlur}
								type="password"
								id="password"
								name="password"
								className={
									!!formik.errors?.password && formik.touched.password
										? 'error'
										: ''
								}
								autoComplete="new-password"
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</fieldset>
						<div className="social_redes">
							<p>Redes Sociais</p>
							<div>
								<button
									type="button"
									className={`facebook ${
										formik.values.facebook ? 'active' : ''
									}`}
									onClick={() => {
										formik.setFieldValue('facebook', !formik.values.facebook);
									}}
								>
									<FaFacebookF size={24} color="#fff" />
								</button>
								<button
									type="button"
									className={`instagram ${
										formik.values.instagram ? 'active' : ''
									}`}
									onClick={() => {
										formik.setFieldValue('instagram', !formik.values.instagram);
									}}
								>
									<FaInstagram size={24} color="#fff" />
								</button>
								<button
									type="button"
									className={`linkedin ${
										formik.values.linkedin ? 'active' : ''
									}`}
									onClick={() => {
										formik.setFieldValue('linkedin', !formik.values.linkedin);
									}}
								>
									<FaLinkedinIn size={24} color="#fff" />
								</button>
							</div>
						</div>
					</div>
				</div>
				{!editClient.edit && (
					<footer>
						<p>
							Será adicionado o valor de <strong>R$ 6,90</strong> na sua
							assinatura atual. Deseja prosseguir?
						</p>
						<Button
							loading={loading}
							type="button"
							onClick={() => {
								if (loading) {
									return;
								}
								formik.handleSubmit();
							}}
						>
							Salvar novo cliente
						</Button>
					</footer>
				)}
				<button type="submit" style={{ display: 'none' }}>
					submit
				</button>
			</form>
		</Container>
	);
};

NewClient.propTypes = {
	saveClient: PropTypes.func.isRequired,
	editClient: PropTypes.exact({
		edit: PropTypes.bool,
		client: PropTypes.object,
	}),
	handleClose: PropTypes.func.isRequired,
	erroClient: PropTypes.func.isRequired,
};

NewClient.defaultProps = {
	editClient: {
		edit: false,
		client: {},
	},
};

export default NewClient;
