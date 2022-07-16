import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineLoading } from 'react-icons/ai';

import Container from './styles';

import { Context } from '../../../../services/context';

function Image({ handleChange, value, type, loading, error, retry, ...rest }) {
	const { handleShowPopUp } = useContext(Context);

	const [selectedFileUrl, setSelectedFileUrl] = useState({
		file: '',
		name: '',
	});
	const onDrop = useCallback(acceptedFiles => {
		const file = acceptedFiles[0];

		if (!file) {
			return;
		}
		const fileUrl = URL.createObjectURL(file);
		setSelectedFileUrl({ file: fileUrl, name: acceptedFiles[0].name });
		handleChange(acceptedFiles, type);
	}, []);
	const { getRootProps, getInputProps, fileRejections } = useDropzone({
		onDrop,
		maxFiles: 1,
		accept: type === 'Imagem' ? 'image/*' : 'video/*',
		maxSize: type === 'Imagem' ? 1024 * 1024 * 2.5 : 1024 * 1024 * 20,
	});

	useEffect(() => {
		if (fileRejections.length > 0) {
			fileRejections[0].errors.forEach(fileError => {
				if (fileError.code === 'file-too-large') {
					handleShowPopUp(
						'error',
						`Tamanho máximo permitido de upload: ${
							type === 'Imagem' ? '2,5mb' : '20mb'
						}, favor compactar  ${
							type === 'a imagem' ? 'imagem' : 'o vídeo'
						} antes de realizar o upload`
					);
				}
			});
		}
	}, [fileRejections]);

	useEffect(() => {
		if ((value && value[0] && value[0]?.file) || !value || !value[0]) {
			setSelectedFileUrl(value && value[0]);
			return;
		}

		const fileUrl = URL.createObjectURL(value[0]);
		setSelectedFileUrl({ file: fileUrl, name: value[0].name });
	}, [value]);

	return (
		<Container error={error} active={selectedFileUrl?.file} {...rest}>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				<div>
					{selectedFileUrl?.file &&
						(type === 'Imagem' ? (
							<img src={selectedFileUrl.file} alt="imagem" />
						) : (
							<video controls>
								<source src={selectedFileUrl.file} />
							</video>
						))}
					<p>{selectedFileUrl?.name || `Selecionar ${type}`}</p>
					{loading && (
						<span>
							<AiOutlineLoading size={24} color="#292729" />
						</span>
					)}
				</div>
			</div>

			{error && (
				<button type="button" onClick={retry}>
					Tentar de novo
				</button>
			)}
		</Container>
	);
}

Image.defaultProps = {
	value: '',
	error: false,
	loading: false,
	retry: () => {},
};

export default Image;
