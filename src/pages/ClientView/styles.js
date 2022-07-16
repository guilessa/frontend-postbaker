import styled, { css } from 'styled-components';

export default styled.main`
	display: flex;
	flex-direction: column;
	padding: 5.37rem 10.7rem;
	overflow: auto;
	flex: 1;

	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 3.12rem;

		> div {
			display: flex;
			align-items: center;
		}

		.logo {
			img {
				width: 5.37rem;
				height: 5.37rem;
				object-fit: cover;
				margin-right: 2.87rem;
			}
		}

		.social_redes {
			margin-left: 1rem;
			p {
				font-size: 1.25rem;
				font-weight: 600;
				margin-right: 3rem;
			}

			> div {
				display: flex;
			}

			button {
				border: none;
				margin: 0;
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				min-width: 2.25rem;
				min-height: 2.25rem;
				max-width: 2.25rem;
				max-height: 2.25rem;
				border-radius: 100%;
				background-color: #dfdfdf;
				border: none;
				cursor: pointer;
				transition: background-color 0.2s linear;

				&.active {
					&.facebook,
					&.linkedin {
						background-color: #3b5998;
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

		p {
			font-size: 1.25rem;
			color: #5d5d5d;
			font-weight: 300;
		}

		h2 {
			font-size: 2.5rem;
			color: #3c3f4f;
			font-weight: bold;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		border-top: 1px solid #bbbbbb;

		.page_header {
			margin-bottom: 5.25rem;

			ul {
				justify-content: center;
				list-style: none;
				display: flex;
				align-items: center;
				margin-top: -1px;
				li {
					padding-top: 1rem;

					:first-child {
						margin-right: 5.25rem;
					}
					&.selected {
						border-top: 1px solid #7f7bfc;
					}

					button {
						background: none;
						border: none;
						cursor: pointer;
						font-size: 1.25rem;
						color: #5d5d5d;
						font-weight: 500;
					}
				}
			}
		}

		.feed {
		}

		.products {
			margin-top: 2rem;
			button {
				background: none;
				width: 100%;
				border: none;
				cursor: pointer;
				margin-bottom: 2rem;
				> div {
					margin: 0;
				}
			}
		}
	}

	> span {
		display: block;
		font-size: 1.25rem;
		color: #707070;
		opacity: 0.3;
		font-weight: 500;
		align-self: center;
		margin-top: auto;
	}

	@media (max-width: 1700px) {
		padding: 3rem 5.01rem;
	}
	@media (max-width: 1400px) {
		padding: 2rem 4.01rem;
	}

	@media (max-width: 1200px) {
		.header {
			.logo {
				img {
					width: 3.37rem;
					height: 3.37rem;
					margin-right: 1rem;
				}
				h2 {
					font-size: 1.5rem;
				}
			}
		}
	}

	@media (max-width: 900px) {
		padding: 2rem;
		.header {
			flex-direction: column;

			.social_redes {
				margin: 1rem 0;
			}
		}
	}

	@media (max-width: 500px) {
		.header .social_redes {
			flex-direction: column;

			p {
				margin: 1rem 0;
			}
		}
	}
`;

export const Feed = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	.slider-list,
	.slider-list .slider-slide {
		height: 100% !important;
	}

	@media (max-width: 1000px) {
		> div {
			width: 17.5rem;
			height: 17.5rem;
		}
	}

	@media (max-width: 800px) {
		flex-direction: column;
		align-items: center;
		flex-wrap: nowrap;
		height: 100%;

		> div {
			max-width: 23.37rem;
			height: 23.37rem;
			width: 100%;
			margin-right: 0;
		}
	}

	@media (max-width: 600px) {
		> div {
			height: 10rem;
		}
	}
`;

export const Button = styled.button`
	cursor: pointer;
	display: flex;
	width: 23.37rem;
	height: 23.37rem;
	position: relative;
	margin-right: 2rem;
	margin-bottom: 2rem;
	z-index: 2;

	img,
	video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -1;
	}

	span {
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fe6969;
		box-shadow: 0 3px 6px rgba(254, 105, 105, 0.77);
		width: 5rem;
		height: 0.69rem;
		font-size: 0.375rem;
		color: #fff;
		border-radius: 100px;
		margin-top: 0.75rem;
		margin-left: 1rem;

		${({ status }) => {
			switch (status) {
				case 'NONE':
					return css`
						color: #474747;
						background: #f5f5f5;
						box-shadow: 0 3px 6px rgba(138, 138, 138, 0.43);
					`;
				case 'APPROVED':
					return css`
						background: #73fe69;
						box-shadow: 0 3px 6px rgba(115, 254, 105, 0.77);
					`;
				case 'ATTENTION':
					return css`
						background: #fee569;
						box-shadow: 0 3px 6px rgba(254, 229, 105, 0.77);
					`;
				case 'CANCELED ':
					return css`
						background: #fe6969;
						box-shadow: 0 3px 6px rgba(254, 105, 105, 0.77);
					`;

				default:
					break;
			}
		}}
	}

	@media (max-width: 1000px) {
		width: 17.5rem;
		height: 17.5rem;
	}
	@media (max-width: 1000px) {
		width: 17.5rem;
		height: 17.5rem;
	}

	@media (max-width: 800px) {
		max-width: 23.37rem;
		height: 23.37rem;
		width: 100%;
		margin-right: 0;
	}

	@media (max-width: 600px) {
		height: 10rem;
	}
`;
