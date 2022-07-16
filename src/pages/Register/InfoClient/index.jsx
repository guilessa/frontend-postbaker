import PropTypes from 'prop-types';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import Container from './styles';

import Button from '../../../components/Button';
import PhotoContainer from '../../../components/PhotoContainer';
import { ContainerButtons, FormContainer } from '../styles';

const InfoClient = ({ onPressButton, formik }) => (
	<Container>
		<h1>Insira as informações do seu primeiro cliente</h1>
		<div className="photo_container">
			<p>Logo da empresa</p>
			<PhotoContainer
				value={formik.values.logo}
				handleChange={file => formik.setFieldValue('logo', file)}
				error={!!formik.errors?.logo && formik.touched.logo}
			/>
		</div>
		<FormContainer>
			<fieldset>
				<label htmlFor="companyName">Nome da empresa</label>
				<input
					type="text"
					id="companyName"
					autoComplete="organization"
					name="companyName"
					className={
						!!formik.errors?.companyName && formik.touched.companyName
							? 'error'
							: ''
					}
					onBlur={formik.handleBlur}
					value={formik.values.companyName}
					onChange={formik.handleChange}
				/>
				{!!formik.errors?.companyName && formik.touched.companyName && (
					<span>Campo Obrigatório</span>
				)}
			</fieldset>
			<fieldset>
				<label htmlFor="passwordAccess">Senha de acesso do cliente</label>
				<input
					type="password"
					id="passwordAccess"
					className={
						!!formik.errors?.passwordAccess && formik.touched.passwordAccess
							? 'error'
							: ''
					}
					name="passwordAccess"
					autoComplete="new-password"
					onBlur={formik.handleBlur}
					value={formik.values.passwordAccess}
					onChange={formik.handleChange}
				/>
				{!!formik.errors?.passwordAccess && formik.touched.passwordAccess && (
					<span>Campo Obrigatório</span>
				)}
			</fieldset>
			<div className="social_redes">
				<p>Redes Sociais</p>
				<div>
					<button
						type="button"
						className={`facebook ${formik.values.facebook ? 'active' : ''}`}
						onClick={() =>
							formik.setFieldValue('facebook', !formik.values.facebook)
						}
					>
						<FaFacebookF size={24} color="#fff" />
					</button>
					<button
						type="button"
						className={`instagram ${formik.values.instagram ? 'active' : ''}`}
						onClick={() =>
							formik.setFieldValue('instagram', !formik.values.instagram)
						}
					>
						<FaInstagram size={24} color="#fff" />
					</button>
					<button
						type="button"
						className={`linkedin ${formik.values.linkedin ? 'active' : ''}`}
						onClick={() =>
							formik.setFieldValue('linkedin', !formik.values.linkedin)
						}
					>
						<FaLinkedinIn size={24} color="#fff" />
					</button>
				</div>
			</div>
			<ContainerButtons className="container_buttons">
				<Button type="button" onClick={onPressButton} className="button">
					Avançar para última etapa
				</Button>
				<div className="container_forget" />
			</ContainerButtons>
		</FormContainer>
	</Container>
);

InfoClient.propTypes = {
	onPressButton: PropTypes.func.isRequired,
	formik: PropTypes.object.isRequired,
};

export default InfoClient;
