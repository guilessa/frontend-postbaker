import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
	flex: 2;
	padding: 3rem 3.5rem 6.75rem 12.5rem;

	.container_register {
		flex: 1;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		a {
			font-size: 2rem;
			text-decoration: none;
			color: #f31515;
			font-weight: 500;
		}
	}
	.content {
		flex: 3;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.container_form {
			h1 {
				color: #3c3f4f;
				font-size: 2.5rem;
				font-weight: 700;
				margin-bottom: 3.4rem;
			}
			form {
				max-width: 28.5rem;
				display: flex;
				flex-direction: column;

				fieldset {
					display: flex;
					flex-direction: column;
					border: none;

					:not(:first-child) {
						margin-top: 1.9rem;
					}

					label {
						color: #5d5d5d;
						font-size: 0.75rem;
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
						background: none;

						:-webkit-autofill {
							background: none;
							color: #5d5d5d;
						}
					}
				}

				.container_buttons {
					margin-top: 1.9rem;
					display: flex;
					align-items: center;
					justify-content: center;
					.button {
						flex: 1;
					}

					.container_forget {
						flex: 1;
						display: flex;
						align-items: center;
						align-self: center;
						justify-content: center;

						a {
							font-weight: 500;
							color: #2b8ee6;
							font-size: 0.8rem;
							text-align: center;
							text-decoration: none;
						}
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
		}
	}

	@media (max-width: 1400px) {
		.container_register a {
			font-size: 1.5rem;
		}

		.content .container_form {
			h1 {
				font-size: 1.87rem;
			}
		}

		.container_buttons {
			margin-top: 1.9rem;
			display: flex;
			align-items: center;
			justify-content: center;
			.button {
				flex: 1;
			}

			.container_forget {
				flex: 1;
				display: flex;
				align-items: center;
				align-self: center;
				justify-content: center;

				a {
					font-weight: 500;
					color: #2b8ee6;
					font-size: 0.8rem;
					text-align: center;
					text-decoration: none;
				}
			}
		}

		span {
			font-size: 1.25rem;
		}
	}
	@media (max-width: 800px) {
		padding: 0.56rem 2.34rem;

		.container_buttons {
			flex-direction: column;
			.button {
				min-height: 3rem;
			}

			.container_forget {
				min-height: 3rem;
			}
		}
	}

	@media (max-width: 500px) {
		span {
			margin-top: 2rem;
		}
	}
`;
