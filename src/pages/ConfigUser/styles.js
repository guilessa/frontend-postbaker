import styled, { css } from 'styled-components';

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

		> span {
			display: block;
			font-size: 1.25rem;
			color: #707070;
			opacity: 0.3;
			font-weight: 500;
			align-self: center;
			padding-bottom: 3rem;
		}

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
			padding-bottom: 4rem;
		}
	}

	@media (max-width: 1400px) {
		.container {
			width: 100%;
		}
	}

	@media (max-width: 800px) {
		.container .content {
			flex-direction: column;
		}
	}

	@media (max-width: 500px) {
		padding: 2rem;
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	flex: 1;
	align-self: stretch;
	margin-bottom: 10.3rem;

	button {
		align-self: center;
	}

	> div {
		display: grid;
		grid-template:
			'col1 col2' auto
			'col1 phone' auto;
		column-gap: 10rem;

		.contact {
			grid-area: phone;
			display: flex;
			flex-direction: column;
			margin-top: 2.56rem;
			display: flex;

			h3 {
				font-size: 1.25rem;
				color: #3c3f4f;
				font-weight: bold;
				margin-bottom: 1.75rem;
			}
			fieldset:first-child {
				max-width: 4.25rem;
			}

			.row {
				flex-direction: row;
				align-items: center;
			}
		}

		.row {
			display: flex;
			fieldset {
				min-width: 0;
				flex: 1;

				:first-child {
					margin-right: 1rem;
				}
			}
		}

		.column {
			.select {
				flex: 1;
				margin-bottom: 0.75rem;
				label {
					color: #5d5d5d;
					font-size: 0.75rem;
					margin-bottom: 1rem;
					display: block;
				}
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
			}
			:first-child {
				grid-area: col1;
				fieldset {
					margin-bottom: 1.9rem;
				}
			}

			:last-child {
				grid-area: col2;
			}

			h2 {
				font-size: 1.25rem;
				color: #3c3f4f;
				font-weight: 700;
				margin-bottom: 2.75rem;
			}
		}
	}

	button {
		max-width: 15.5rem;
		margin-top: 2rem;
	}

	@media (max-width: 1400px) {
		> div {
			column-gap: 5rem;
		}
	}

	@media (max-width: 800px) {
		> div {
			grid-template:
				'col1 col2' auto
				'phone phone' auto;
			.column {
				.row {
					flex-direction: column;
					fieldset {
						margin-right: 0;
					}
				}
			}
		}
		margin-right: 0;
		margin-bottom: 3rem;
	}

	@media (max-width: 600px) {
		> div {
			grid-template:
				'col1 ' auto
				'col2' auto
				'phone' auto;
			.column {
				:first-child {
					margin-right: 2rem;
				}
				.row {
					flex-direction: column;
					fieldset {
						margin-right: 0;
					}
				}
			}
		}
	}
	@media (max-width: 500px) {
		margin-right: 0;
		margin-bottom: 3rem;
		> div {
			flex-direction: column;
			.column:first-child {
				margin-right: 0;
			}
		}
	}
`;

export const FieldSet = styled.fieldset`
	display: flex;
	flex-direction: column;
	border: none;
	min-width: 28.56rem;
	margin-bottom: 0.87rem;

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

	@media (max-width: 1200px) {
		min-width: 0;
	}
`;

export const Info = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	h3 {
		font-size: 1.25rem;
		font-weight: bold;
		color: #3c3f4f;
	}

	.price {
		font-size: 2.63rem;
		font-weight: bold;
		color: #3c3f4f;
		margin-top: 0.5rem;
		margin-bottom: 2.19rem;
	}

	.history {
		margin-top: 2.75rem;
		margin-bottom: 3.75rem;
	}

	.container_buttons {
		display: flex;
		margin-top: auto;
		align-self: center;

		button,
		a {
			display: flex;
			align-items: center;
			text-decoration: none;
			justify-content: center;
			padding: 1rem;
			font-size: 0.81rem;
			font-weight: 500;
			border: none;
			background: none;
			cursor: pointer;
			max-width: 17.31rem;

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

	@media (max-width: 500px) {
		.container_buttons {
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
`;

export const Payment = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.25rem;

	p {
		color: #5d5d5d;
	}
	strong {
		font-weight: bold;
	}

	span {
		flex: 1;
		border: 1px solid #e1e1e1;
		margin: 0 1rem;
	}

	div {
		padding: 0.6rem;
		color: #fff;
		border-radius: 8px;
		font-weight: bold;
		font-size: 0.62rem;
		${({ status }) => {
			switch (status) {
				case 'PAID':
					return css`
						background-color: #30a22c;
					`;
				case 'CANCELED':
					return css`
						background-color: #fe6969;
					`;
				case 'AUTHORIZED':
					return css`
						background-color: #fee569;
					`;
				case 'PROCESSING':
					return css`
						background-color: #fee569;
					`;
				case 'REFUNDED':
					return css`
						background-color: #fe6969;
					`;
				case 'WAITING_PAYMENT':
					return css`
						background-color: #fee569;
					`;
				case 'PENDING_REFUND':
					return css`
						background-color: #fee569;
					`;
				case 'REFUSED':
					return css`
						background-color: #fe6969;
					`;
				case 'CHARGEDBACK':
					return css`
						background-color: #fe6969;
					`;
				case 'ANALYZING':
					return css`
						background-color: #fee569;
					`;
				case 'PENDING_REVIEW':
					return css`
						background-color: #fee569;
					`;
				default:
					return css`
						background-color: #fee569;
					`;
			}
		}}
	}
`;
