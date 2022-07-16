import styled from 'styled-components';

export default styled.main`
	display: flex;
	overflow: auto;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	padding: 4rem;

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.header {
			display: flex;
			align-items: center;
			margin-bottom: 4.25rem;
			flex-wrap: wrap;
			a {
				display: flex;
				align-items: center;
				text-decoration: none;
			}

			p {
				color: #3c3f4f;
				font-weight: 500;
				font-size: 0.81rem;
				margin: 0 1rem;
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
			justify-content: center;
			align-items: center;
			padding-bottom: 4rem;
			flex: 1;
		}

		h3 {
			font-size: 1.8rem;
			max-width: 28.5rem;
			font-weight: bold;
			color: #3c3f4f;
		}

		.container_buttons {
			display: flex;
			margin-top: 3rem;

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 1rem;
				font-size: 0.81rem;
				font-weight: 500;
				border: none;
				background: none;
				cursor: pointer;
				width: 100%;
				max-width: 17.25rem;

				&.edit {
					background-color: #f9f9f9;
					color: #5d5d5d;
					border-radius: 8px;
					margin-right: 1rem;
				}

				&.desactive {
					color: #ee4266;
				}
			}
		}
	}

	span {
		display: block;
		font-size: 1.25rem;
		color: #707070;
		opacity: 0.3;
		font-weight: 500;
		align-self: center;
	}

	@media (max-width: 1400px) {
		.container {
			width: 100%;
			form {
				min-width: 12.5rem;
				max-width: 28.5rem;
				margin-right: 7.65rem;
			}
		}
	}

	@media (max-width: 800px) {
		span {
			font-size: 0.8rem;
		}
		.container {
			.header {
				p {
				}
				h2 {
					font-size: 1.67rem;
				}
			}
			.content {
				h3 {
					font-size: 1.15rem;
				}
				form {
					min-width: 12.5rem;
					max-width: 100%;
					margin-right: 0;
					margin-bottom: 3rem;
				}
				flex-direction: column;
			}
		}
	}

	@media (max-width: 500px) {
		padding: 2rem;
		.container {
			.header {
				h2 {
					font-size: 1.37rem;
				}
			}
			.content .container_buttons {
				flex-direction: column;

				button {
					max-width: 100%;

					.edit {
						margin: 0;
						margin-bottom: 1rem;
					}
				}
			}
		}
	}
`;
