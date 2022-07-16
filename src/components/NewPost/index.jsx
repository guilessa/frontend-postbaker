import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { useFormik } from 'formik';
import { useContext, useEffect, useState, useCallback } from 'react';
import Calendar from 'react-datetime-picker';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';

import Image from './component/Image';
import Container, {
	ContainerCalendar,
	Select,
	InputContainer,
	Form,
} from './styles';

import api from '../../config/api';
import { Context } from '../../services/context';
import newPostSchema from '../../validations/newPostSchema';
import Button from '../Button';
import Carrousel from '../Carrousel';

const initialValues = {
	facebook: false,
	instagram: false,
	linkedin: false,
	date: new Date(),
	showForClient: true,
	description: '',
	logo: [],
	dateFormat: '',
	typeFile: 'Imagem',
};

const NewPost = ({ savePost, clientInfo }) => {
	const [showDate, setShowDate] = useState(false);
	const { handleShowPopUp } = useContext(Context);
	const [loading, setLoading] = useState(false);
	const [stateFile, setStateFile] = useState({
		loading: false,
		error: false,
	});
	const [currentPost, setCurrentPost] = useState(null);

	const formik = useFormik({
		initialValues,
		async onSubmit(values) {
			if (loading || values.logo.length === 0) {
				return;
			}
			setLoading(true);
			try {
				let type = 'SINGLE';
				if (values.logo.length > 1) {
					type = 'GALLERY';
				}
				if (values.logo[0]?.type?.split('/')[0] === 'video') {
					type = 'VIDEO';
				}
				const response = await api.post(
					`clients/${clientInfo.accessHash}/posts/`,
					{
						publish: values.showForClient,
						instagram: values.instagram,
						facebook: values.facebook,
						linkedin: values.linkedin,
						postingDate: values.date,
						caption: values.description,
						type,
					}
				);

				setCurrentPost(response.data.id);
			} catch (e) {
				setLoading(false);
				if (e?.response?.url?.split('/')[0] === 'postfiles') {
					handleShowPopUp('error', 'Erro em Upload de arquivos');
					return;
				}
				if (!e.status) {
					handleShowPopUp('error', 'Erro de Conexão');
					return;
				}
				handleShowPopUp('error', 'Erro, tente novamente');
			}
		},
		validationSchema: newPostSchema,
	});

	const uploadFiles = useCallback(() => {
		async function postFiles() {
			setStateFile(() => ({ error: false, loading: true }));
			const filesUpload = [...formik.values.logo];
			const newFilesUpload = [...formik.values.logo];
			try {
				const promises = filesUpload.map(async (logo, index) => {
					const formData = new FormData();
					formData.append('file', logo);
					formData.append('post', currentPost);
					await api.post('postfiles/', formData);
					newFilesUpload[index] = '';
				});
				const results = await Promise.allSettled(promises);

				results.forEach(result => {
					if (result.status === 'rejected') throw new Error();
				});

				setLoading(false);
				setStateFile(() => ({ error: false, loading: false }));

				const date = new Date();
				const dateFormat = format(date, "d 'de' MMMM 'de' yyyy à's' HH'h'mm", {
					locale: ptBr,
				});
				formik.resetForm({ ...initialValues, dateFormat, date });
				savePost();

				setCurrentPost(null);
				handleShowPopUp('sucess', 'Post Criado');
			} catch (e) {
				const filesNotUploaded = newFilesUpload.filter(file => file !== '');
				formik.setFieldValue('logo', filesNotUploaded);
				setStateFile(() => ({ error: true, loading: false }));
				setLoading(false);
				handleShowPopUp('error', 'Arquivos não enviados');
			}
		}
		postFiles();
	}, [currentPost, formik.values.logo]);

	useEffect(() => {
		if (currentPost === null) {
			return;
		}

		uploadFiles();
	}, [currentPost]);

	useEffect(() => {
		if (formik.values.date) {
			const dateFormat = format(
				formik.values.date,
				"d 'de' MMMM 'de' yyyy à's' HH'h'mm",
				{
					locale: ptBr,
				}
			);

			formik.setFieldValue('dateFormat', dateFormat);
		}
	}, [formik.values.date]);

	return (
		<Container>
			<ContainerCalendar show={showDate}>
				<span type="button" onClick={() => setShowDate(false)} />
				<div>
					<Calendar
						onChange={valueDate => {
							if (!valueDate) {
								return;
							}
							formik.setFieldValue('date', valueDate);
						}}
						value={formik.values.date}
					/>
				</div>
			</ContainerCalendar>
			<button type="button" className="close_button" onClick={savePost}>
				<IoMdClose size={24} color="#fff" />
			</button>
			<div className="header_container">
				<h2>Novo post</h2>
				<Button loading={loading} onClick={formik.handleSubmit} type="button">
					Salvar novo Post
				</Button>
			</div>
			<Form onSubmit={formik.handleSubmit}>
				<button type="submit" style={{ display: 'none' }}>
					submit
				</button>
				<InputContainer>
					<div className="social_redes">
						<p>Redes Sociais</p>
						<div>
							<button
								type="button"
								className={`facebook ${formik.values.facebook ? 'active' : ''}`}
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
								className={`linkedin ${formik.values.linkedin ? 'active' : ''}`}
								onClick={() => {
									formik.setFieldValue('linkedin', !formik.values.linkedin);
								}}
							>
								<FaLinkedinIn size={24} color="#fff" />
							</button>
						</div>
					</div>
					<div className="date">
						<p>Data de Postagem</p>
						<button
							type="button"
							onClick={() => {
								setShowDate(true);
							}}
						>
							<svg
								id="calendar"
								xmlns="http://www.w3.org/2000/svg"
								width="22.048"
								height="22.048"
								viewBox="0 0 22.048 22.048"
							>
								<g id="Grupo_56" data-name="Grupo 56">
									<g id="Grupo_55" data-name="Grupo 55">
										<path
											id="Caminho_20"
											data-name="Caminho 20"
											d="M19.465,1.723H18.431V0H16.709V1.723H5.34V0H3.617V1.723H2.584A2.587,2.587,0,0,0,0,4.306V19.465a2.587,2.587,0,0,0,2.584,2.584H19.465a2.587,2.587,0,0,0,2.584-2.584V4.306A2.587,2.587,0,0,0,19.465,1.723Zm.861,17.742a.862.862,0,0,1-.861.861H2.584a.862.862,0,0,1-.861-.861V8.1h18.6Zm0-13.091H1.723V4.306a.862.862,0,0,1,.861-.861H3.617V5.168H5.34V3.445H16.709V5.168h1.723V3.445h1.034a.862.862,0,0,1,.861.861Z"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_58"
									data-name="Grupo 58"
									transform="translate(3.289 9.866)"
								>
									<g
										id="Grupo_57"
										data-name="Grupo 57"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_61"
											data-name="Retângulo 61"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_60"
									data-name="Grupo 60"
									transform="translate(6.7 9.866)"
								>
									<g
										id="Grupo_59"
										data-name="Grupo 59"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_62"
											data-name="Retângulo 62"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_62"
									data-name="Grupo 62"
									transform="translate(10.111 9.866)"
								>
									<g
										id="Grupo_61"
										data-name="Grupo 61"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_63"
											data-name="Retângulo 63"
											width="1.827"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_64"
									data-name="Grupo 64"
									transform="translate(13.644 9.866)"
								>
									<g
										id="Grupo_63"
										data-name="Grupo 63"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_64"
											data-name="Retângulo 64"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_66"
									data-name="Grupo 66"
									transform="translate(17.055 9.866)"
								>
									<g
										id="Grupo_65"
										data-name="Grupo 65"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_65"
											data-name="Retângulo 65"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_68"
									data-name="Grupo 68"
									transform="translate(3.289 13.399)"
								>
									<g
										id="Grupo_67"
										data-name="Grupo 67"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_66"
											data-name="Retângulo 66"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_70"
									data-name="Grupo 70"
									transform="translate(6.7 13.399)"
								>
									<g
										id="Grupo_69"
										data-name="Grupo 69"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_67"
											data-name="Retângulo 67"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_72"
									data-name="Grupo 72"
									transform="translate(10.111 13.399)"
								>
									<g
										id="Grupo_71"
										data-name="Grupo 71"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_68"
											data-name="Retângulo 68"
											width="1.827"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_74"
									data-name="Grupo 74"
									transform="translate(13.644 13.399)"
								>
									<g
										id="Grupo_73"
										data-name="Grupo 73"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_69"
											data-name="Retângulo 69"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_76"
									data-name="Grupo 76"
									transform="translate(3.289 16.81)"
								>
									<g
										id="Grupo_75"
										data-name="Grupo 75"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_70"
											data-name="Retângulo 70"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_78"
									data-name="Grupo 78"
									transform="translate(6.7 16.81)"
								>
									<g
										id="Grupo_77"
										data-name="Grupo 77"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_71"
											data-name="Retângulo 71"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_80"
									data-name="Grupo 80"
									transform="translate(10.111 16.81)"
								>
									<g
										id="Grupo_79"
										data-name="Grupo 79"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_72"
											data-name="Retângulo 72"
											width="1.827"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_82"
									data-name="Grupo 82"
									transform="translate(13.644 16.81)"
								>
									<g
										id="Grupo_81"
										data-name="Grupo 81"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_73"
											data-name="Retângulo 73"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
								<g
									id="Grupo_84"
									data-name="Grupo 84"
									transform="translate(17.055 13.399)"
								>
									<g
										id="Grupo_83"
										data-name="Grupo 83"
										transform="translate(0 0)"
									>
										<rect
											id="Retângulo_74"
											data-name="Retângulo 74"
											width="1.706"
											height="1.706"
											fill="#3c3f4f"
										/>
									</g>
								</g>
							</svg>

							<p>{formik.values.dateFormat}</p>
						</button>
					</div>
					<Select>
						<p>Mostrar para o cliente?</p>
						<div>
							<div className="mask">
								<p>{formik.values.showForClient ? 'Sim' : 'Não'}</p>
								<MdKeyboardArrowDown size={32} color="#717171" />
							</div>
							<select
								onChange={e => {
									if (e.target.value === 'true') {
										formik.setFieldValue('showForClient', true);
										return;
									}
									formik.setFieldValue('showForClient', false);
								}}
							>
								<option value="true">sim</option>
								<option value="false">nao</option>
							</select>
						</div>
					</Select>
				</InputContainer>
				<div>
					<div className="creating">
						<Select>
							<p>Criativo</p>
							<div>
								<div className="mask">
									<p>{formik.values.typeFile}</p>
									<MdKeyboardArrowDown size={32} color="#717171" />
								</div>
								<select
									onChange={e => {
										formik.setFieldValue('logo', null);
										formik.setFieldValue('typeFile', e.target.value);
									}}
								>
									<option value="Imagem">Imagem</option>
									<option value="Carrousel">Carrousel</option>
									<option value="Video">Video</option>
								</select>
							</div>
						</Select>
						{formik.values.typeFile === 'Carrousel' ? (
							<Carrousel
								loading={stateFile.loading}
								error={stateFile.error}
								items={formik.values.logo}
								addItem={file => {
									formik.setFieldValue('logo', file);
								}}
								deleteItem={() => {}}
								retry={uploadFiles}
								notPointEvents={stateFile.loading}
							/>
						) : (
							<Image
								loading={stateFile.loading}
								error={stateFile.error}
								retry={uploadFiles}
								type={formik.values.typeFile}
								value={formik.values.logo}
								handleChange={file => {
									formik.setFieldValue('logo', file);
								}}
							/>
						)}
					</div>
				</div>

				<div className="text">
					<label>Legenda</label>
					<textarea
						name="description"
						value={formik.values.description}
						onChange={formik.handleChange}
					/>
				</div>
			</Form>
		</Container>
	);
};

NewPost.defaultProps = {
	clientInfo: {
		accessHash: '',
	},
};

export default NewPost;
