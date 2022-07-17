import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
	height: 100%;
	max-width: 73.37rem;
	position: relative;
	max-height: 57.69rem;
	justify-content: center;

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
	.rating {
		display: flex;
		width: 100%;
		flex: 1;
		overflow: hidden;
		background-color: #fff;
		max-height: 43rem;
	}

	.content_text {
		white-space: pre-line;
		color: #fff;
		font-size: 1.12rem;
		font-weight: 600;
		margin-top: 1.5rem;
		word-break: break-all;
	}

	img,
	video {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.close_button {
		position: absolute;
		top: -2rem;
		right: 1rem;
		background: none;
		border: none;
		z-index: 2;
	}
	h3 {
		font-size: 1.5rem;

		color: #3c3f4f;
	}

	form {
		display: flex;
		flex-direction: column;

		display: flex;
		padding-top: 2.5rem;
		.buttons {
			display: flex;
			justify-content: space-evenly;
			button {
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 100%;
				border: none;
				width: 4.12rem;
				height: 4.12rem;
				opacity: 0.29;
				text-align: center;

				:not(:last-child) {
					margin-right: 0.81rem;
				}

				&.cancel {
					background: #fe6969;
				}
				&.edit {
					background-color: #fee569;
				}

				&.good {
					background-color: #73fe69;
				}

				&.active {
					opacity: 1;
				}
			}

			.rateButtonSpan {
				text-align: center;

				p {
					padding-top: 1rem;
					font-size: 0.9rem;
				}
			}
		}
	}

	.content_container {
		flex: 1;
		margin: 2rem 0;
		padding-top: 2rem;
		min-height: 8.2rem;
		height: auto;
		overflow: auto;
		border-top: 1px solid #e5e5e5;
		display: flex;
		flex-direction: column;

		.comment_box {
			display: block;
			height: auto;
			span {
				padding-right: 0.8rem;
			}
			p {
				padding-right: 1rem;
				line-break: auto;
				word-break: break-all;
			}
		}

		h4 {
			padding-bottom: 1rem;
		}

		.display-linebreak {
			white-space: pre-line;
		}
	}

	.newPost {
		display: flex;
		flex-direction: column;
		label {
			font-size: 0.6rem;
			color: #5d5d5d;
			margin-left: 0.5rem;
		}

		div {
			display: flex;
			align-items: center;
			margin-top: 0.1rem;

			input {
				width: 70%;
				border: 1px solid #e4e4e4;
				height: 3rem;
				border-radius: 8px;
				outline: none;
				padding-left: 1.5rem;
				padding-right: 1rem;
				font-size: 0.69rem;
				color: #5d5d5d;
				font-weight: 500;
				box-shadow: 0px 15px 40px rgba(183, 183, 183, 0.1);
			}

			button {
				height: 3rem;
				border: none;
				font-weight: bold;
				cursor: pointer;
				transition: filter linear 0.2s;

				:hover {
					filter: brightness(0.95);
				}
			}

			#smallButton {
				margin-left: 0.3rem;
				width: 30%;
			}

			#fullButton {
				width: 100%;
			}
		}
	}

	@media (max-width: 1400px) {
		max-height: 90vh;
	}

	@media (max-width: 1200px) {
		max-width: 55rem;
		.image {
			flex: 2;
		}
	}
	@media (max-width: 900px) {
		max-width: 35rem;
		margin: 2rem;
		margin-top: 3rem;
		height: 90vh;

		.rating {
			flex-direction: column;
			> div {
				flex: 1;
				padding: 1rem;
			}
		}
	}

	@media (max-width: 400px) {
		form .buttons {
			flex-direction: column;
			align-items: center;

			button {
				margin-right: 0 !important;
				margin-bottom: 1rem;
			}
		}
	}
`;

export const ImageContainer = styled.div.attrs(({ width, height }) => {
	if (window.innerWidth <= 900) {
		return {
			style: {
				width: `${width}px`,
				minHeight: `${width * 0.3}px`,
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
	padding: 0 !important;
	flex: 1;
	img,
	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	/* @media (max-width: 900px) {
		min-width: ${({ width }) => `${width}px`};
		min-height: ${({ width }) => `${width}px`};
	} */
`;

export const Content = styled.div.attrs(({ width, maxWidth }) => {
	if (window.innerWidth <= 900) {
		return {
			style: {
				width: '100%',
			},
		};
	}

	return {
		style: {
			maxWidth: `${maxWidth}px`,
			minWidth: `${width}px`,
		},
	};
})`
	overflow: auto;
	display: flex;
	flex-direction: column;
	padding: 2.5rem 3rem;

	&.image {
		min-height: 20rem;
		flex: 3;
		padding: 0;
		overflow: hidden;
	}
	@media (max-width: 900px) {
		flex: 1;
		padding: 1rem;
	}
`;
