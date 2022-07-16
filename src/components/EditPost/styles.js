import styled from 'styled-components';

export default styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	position: relative;
	overflow: auto;
	max-width: 95.7rem;
	max-height: 43.5rem;

	.slider-list,
	.slider-list .slider-slide {
		height: 100% !important;
	}
	.slider {
		button {
			background: none;
			border: none;
			cursor: pointer;
		}
	}
	img {
		object-fit: cover;
	}

	.close_button {
		position: absolute;
		top: -2rem;
		right: 1rem;
		background: none;
		border: none;
		z-index: 2;
	}

	.header_container {
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h3 {
			font-size: 2.44rem;

			color: #3c3f4f;
		}

		> div {
			display: flex;
			align-items: flex-end;
			.button {
				margin-top: 1.5rem;
				width: 15.5rem;
				display: flex;
				justify-content: flex-end;
			}

			.delete_post {
				width: 10.19rem;
				margin-right: 1rem;
				height: 3rem;
				cursor: pointer;
				background: rgba(238, 66, 102, 0.07);
				color: #ee4266;
				font-weight: 500;
				border: 1px solid #ee4266;
				border-radius: 8px;
				box-shadow: 0 10px 15px rgba(238, 66, 102, 0.38);
				transition: filter linear 0.2s;

				:hover {
					filter: brightness(0.9);
				}
			}
		}
	}

	.image {
	}

	@media (max-width: 1600px) {
		max-width: 73.4rem;
	}

	@media (max-width: 1300px) {
		max-width: 55rem;

		.image {
			flex: 2.5;
		}
	}

	@media (max-width: 1100px) {
		.header_container {
			flex-direction: column;
		}
	}
	@media (max-width: 900px) {
		max-width: 40rem;
		flex-direction: column;
		max-height: 90vh;
		margin: 0 3rem;

		.image {
			min-height: 23rem;
			flex: 2.5;
		}
	}

	@media (max-width: 600px) {
		.header_container {
			> div {
				flex-direction: column;
				align-items: center;
				margin-top: 1rem;

				.button {
					width: 100%;
				}
				.delete_post {
					width: 100%;
					margin: 0;
				}
			}
		}
	}
`;

export const Form = styled.form`
	display: flex;
	flex: 1;
	align-self: stretch;
	flex-direction: column;

	display: flex;
	padding-top: 2.5rem;
	border-top: 1px solid #bbbbbb;

	p,
	label {
		color: #3c3f4f;
		font-weight: 500;
		margin-bottom: 0.62rem;
	}

	.date {
		flex: 2;
		display: flex;
		flex-direction: column;

		> button {
			background: none;
			cursor: pointer;
			display: flex;
			align-items: center;
			height: 3rem;
			border-radius: 8px;
			border: 1px solid #e4e4e4;
			box-shadow: 0 15px 40px rgba(183, 183, 183, 0.11);
			padding-left: 1rem;
			align-self: stretch;

			p {
				color: #5d5d5d;
				font-weight: 500;
				margin: 0;
				margin-left: 1rem;
			}
		}
	}

	.social_redes {
		display: flex;
		flex-direction: column;

		> div {
			display: flex;
		}

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 2.25rem;
			height: 2.25rem;
			border-radius: 100%;
			background-color: #dfdfdf;
			border: none;
			cursor: pointer;

			&.active {
				&.facebook,
				&.linkedin {
					background: #3b5998;
				}

				&.instagram {
					background-color: #8d4b26;
				}
			}

			:nth-child(2n) {
				margin: 0 1rem;
			}
		}
	}

	> button {
		width: 15.5rem;
	}

	.text {
		display: flex;
		flex: 1;
		flex-direction: column;

		textarea {
			box-shadow: 0 15px 40px rgba(183, 183, 183, 0.11);
			height: 100%;
			border-radius: 8px;
			resize: none;
			border: 1px solid #e4e4e4;
			outline: none;
			padding: 1rem;
			color: #5d5d5d;
			font-size: 1rem;
		}
	}
	&.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		background: #e6eef3;
		border-radius: 0 0 8px 8px;
		border: 1px solid rgba(190, 190, 190, 0.23);
		padding: 0 3.75rem;

		p {
			font-size: 1.19rem;
			max-width: 25.37rem;
			font-weight: 500;
			color: #3c3f4f;
		}

		strong {
			font-weight: 600;
		}
		button {
			max-width: 15.5rem;
		}
	}
`;

export const Select = styled.div`
	flex: 1;
	> div {
		position: relative;

		.mask {
			align-items: center;
			display: flex;
			height: 3rem;
			border-radius: 8px;
			border: 1px solid #e4e4e4;
			box-shadow: 0 15px 40px rgba(183, 183, 183, 0.11);
			padding-left: 1rem;
			align-self: stretch;
			position: relative;
			justify-content: space-between;
			padding: 0 1rem;
			z-index: 2;
			pointer-events: none;
			background: #fff;
			p {
				margin: 0;
			}
		}
		select {
			cursor: pointer;
			position: absolute;
			outline: none;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 8px;
			border: none;
		}
	}
`;

export const ContainerCalendar = styled.div`
	position: fixed;
	width: 100vw;
	top: 0;
	left: 0;
	height: 100vh;
	display: ${({ show }) => (show ? 'block' : 'none')} !important;
	z-index: 3;
	padding: 0 !important;

	> span {
		border: none;
		top: 0;
		left: 0;
		display: block;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.77);
	}

	> div {
		position: absolute;
		background: #fff;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const InputsContainer = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 1rem;

	:not(:first-child) {
		margin: 2.2rem 0;
	}

	.singleImage.none {
		display: none;
	}

	> div {
		flex: 1;
		justify-content: center;

		height: 100%;
	}

	.creating {
		display: flex;
		flex-direction: column;
		width: 100%;

		> div {
			display: flex;
			justify-content: space-between;

			> div {
				position: relative;
				padding-left: 0.5rem;
				svg:first-child {
					position: absolute;
					top: 0;
					right: 2.4rem;
				}
				svg:last-child {
					z-index: 2;
				}
			}
		}
	}

	fieldset {
		display: flex;
		flex-direction: column;
		border: none;

		:not(:first-child) {
			margin-top: 1.9rem;
		}
		position: relative;

		label {
			color: #5d5d5d;
			font-size: 1rem;
			font-weight: 600;
		}

		input {
			width: 100%;
			margin-top: 1rem;
			border: 1px solid #e4e4e4;
			height: 3rem;
			border-radius: 8px;
			outline: none;
			padding-left: 1.5rem;
			font-size: 1rem;
			color: #5d5d5d;
			font-weight: 500;
			box-shadow: 0px 15px 40px rgba(183, 183, 183, 0.1);
		}
	}

	@media (max-width: 600px) {
		align-items: normal;
		flex-direction: column;
	}
`;

export const ImageContainer = styled.div.attrs(({ width, height }) => {
	if (window.innerWidth <= 900) {
		return {
			style: {
				width: `${width}px`,
				minHeight: `${width * 0.5}px`,
				maxWidth: `${width}px`,
				maxHeight: `${width * 0.5}px`,
			},
		};
	}
	if (window.innerHeight > window.innerWidth) {
		return {
			style: {
				width: `${height * 0.5}px`,
				minHeight: `${height}px`,
				maxWidth: `${height * 0.5}px`,
				maxHeight: `${height}px`,
			},
		};
	}

	return {
		style: {
			width: `${height}px`,
			minHeight: `${height}px`,
			maxWidth: `${height}px`,
			maxHeight: `${height}px`,
		},
	};
})`
	padding: 0;

	img,
	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

export const Content = styled.div.attrs(({ width }) => {
	if (window.innerWidth <= 900) {
		return {
			style: {
				width: '100%',
			},
		};
	}

	return {
		style: {
			minWidth: `${width}px`,
		},
	};
})`
	display: flex;
	flex-direction: column;
	padding: 1.2rem;
	flex: 2;

	@media (max-width: 900px) {
		flex: 1;
		padding: 1rem;
	}
`;
