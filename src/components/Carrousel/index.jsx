import Carrousel from 'nuka-carousel';
import PropTypes from 'prop-types';
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	useContext,
} from 'react';
import { useDropzone } from 'react-dropzone';
import {
	AiOutlinePlus,
	AiOutlineClose,
	AiOutlineLoading,
} from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import Container, { ImageContainer } from './styles';

import { Context } from '../../services/context';

function CarrouselContainer({
	addItem,
	items,
	deleteItem,
	loading,
	error,
	retry,
	notPointEvents,
	...rest
}) {
	const [selectedFileUrl, setSelectedFileUrl] = useState([]);
	const [selectedFile, setSelectedFile] = useState([]);
	const [slidesShow, setSlidesShow] = useState(4);
	const [currentSlide, setCurrentSlide] = useState(0);
	const carrouselRef = useRef(null);
	const { handleShowPopUp } = useContext(Context);
	const onDrop = useCallback(acceptedFiles => {
		const file = acceptedFiles[0];

		if (!file || selectedFileUrl.length === 10) {
			return;
		}

		setSelectedFileUrl(props => {
			const filesUrl = acceptedFiles
				.map(acceptedFile => URL.createObjectURL(acceptedFile))
				.slice(0, 10 - props.length);
			const newFilesArray = [...props, ...filesUrl];
			if (newFilesArray.length > 10) {
				return props;
			}
			return newFilesArray;
		});
		const filesUrl = acceptedFiles.slice(0, 10 - selectedFileUrl.length);

		setSelectedFile(props => [...props, ...filesUrl]);
	}, []);

	useEffect(() => {
		addItem(selectedFile);
	}, [selectedFile]);

	const resizeCarrousel = useCallback(() => {
		if (!carrouselRef?.current?.frame?.clientWidth) {
			return;
		}
		if (carrouselRef.current.frame.clientWidth <= 160) {
			setSlidesShow(1);
			return;
		}
		if (carrouselRef.current.frame.clientWidth <= 230) {
			setSlidesShow(2);
			return;
		}

		if (carrouselRef.current.frame.clientWidth <= 300) {
			setSlidesShow(3);
			return;
		}

		setSlidesShow(4);
	}, [carrouselRef?.current]);

	useEffect(() => {
		resizeCarrousel();
	}, [resizeCarrousel]);

	useEffect(() => {
		if (items && items[0]) {
			const itemUrls = items.map(item => {
				if (typeof item === 'string') {
					return item;
				}
				return URL.createObjectURL(item);
			});
			setSelectedFileUrl(itemUrls);
		}
	}, [items]);

	const { getRootProps, getInputProps, fileRejections } = useDropzone({
		onDrop,
		accept: 'image/*',
		maxSize: 1024 * 1024 * 2.5,
	});

	useEffect(() => {
		if (fileRejections.length > 0) {
			fileRejections[0].errors.forEach(fileError => {
				if (fileError.code === 'file-too-large') {
					handleShowPopUp(
						'error',
						'Tamanho máximo permitido de upload: 2,5mb, favor compactar a imagem antes de realizar o upload'
					);
				}
			});
		}
	}, [fileRejections]);

	return (
		<Container
			loading={loading}
			error={error}
			notPointEvents={notPointEvents}
			existImage={selectedFileUrl.length === 0}
			{...rest}
		>
			{selectedFileUrl.length < 10 && (
				<div className="add_image" {...getRootProps()}>
					<input {...getInputProps()} />
					<div>
						{selectedFileUrl.length === 0 ? (
							<p>Selecione até 10 imagens</p>
						) : (
							<AiOutlinePlus size={32} color={error ? '#fe6969' : '#76A9EC'} />
						)}
					</div>
				</div>
			)}
			{selectedFileUrl.length > 0 && (
				<div className="carrousel-container">
					<Carrousel
						ref={carrouselRef}
						onResize={resizeCarrousel}
						afterSlide={i => {
							setCurrentSlide(i);
						}}
						renderCenterLeftControls={props => (
							<button
								onClick={() => {
									props.previousSlide();
								}}
								className={`${currentSlide === 0 ? 'desactive' : ''}`}
								type="button"
							>
								<IoIosArrowBack
									size={30}
									color={`${currentSlide === 0 ? '#EBEBEB' : '#717171'}`}
								/>
							</button>
						)}
						slidesToShow={slidesShow}
						defaultControlsConfig={{
							pagingDotsStyle: { display: 'none' },
						}}
						renderCenterRightControls={props => (
							<button
								type="button"
								onClick={() => {
									props.nextSlide();
								}}
							>
								<IoIosArrowForward
									size={30}
									color={`${
										currentSlide === selectedFileUrl.length - 1
											? '#EBEBEB'
											: '#717171'
									}`}
								/>
							</button>
						)}
					>
						{selectedFileUrl.map((file, index) => (
							<ImageContainer key={file}>
								<button
									type="button"
									onClick={() => {
										const filesUrl = [...selectedFileUrl].splice(
											0,
											selectedFileUrl.length - selectedFile.length
										);

										const newFilesUrl = selectedFileUrl.filter(
											(_, indexUrl) => indexUrl !== index
										);
										const filesAll = [...filesUrl, ...selectedFile];
										setSelectedFileUrl(newFilesUrl);
										if (typeof filesAll[index] !== 'string') {
											const filesRest = selectedFile.filter(
												(_, indexValue) =>
													indexValue !== index - filesUrl.length
											);
											setSelectedFile(filesRest);
										}
										deleteItem(
											selectedFile[index - filesUrl.length],
											index,
											filesAll[index]
										);
									}}
								>
									<img src={file} alt="imagem" />
									<span>
										<AiOutlineClose size={32} color="#fff" />
									</span>
								</button>
								<div>
									<p>{index + 1}</p>
								</div>
							</ImageContainer>
						))}
					</Carrousel>
					{loading && (
						<span>
							<AiOutlineLoading size={24} color="#000" />
						</span>
					)}
					{error && (
						<button type="button" onClick={retry}>
							Tentar de novo
						</button>
					)}
				</div>
			)}
		</Container>
	);
}

CarrouselContainer.propTypes = {
	addItem: PropTypes.func,
	deleteItem: PropTypes.func,
	items: PropTypes.array,
	retry: PropTypes.func,
	error: PropTypes.bool,
	loading: PropTypes.bool,
	notPointEvents: PropTypes.bool,
};

CarrouselContainer.defaultProps = {
	addItem() {},
	deleteItem() {},
	items: [],
	error: false,
	loading: false,
	retry: () => {},
	notPointEvents: false,
};

export default CarrouselContainer;
