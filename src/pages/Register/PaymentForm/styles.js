import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
	from{
		transform:rotateZ(0)
	}
	to{
		transform:rotateZ(360deg)
	}
`;

export default styled.div`
	.loading {
		animation: ${rotate} 2s infinite;
	}
	p {
		max-width: 23.3rem;
		margin: 1rem 0;
	}
	> div {
		max-width: 32.37rem;

		.container_buttons {
			margin-top: 3.5rem;
		}
	}
	.row {
		display: flex;

		margin-top: 1.9rem;
		fieldset {
			min-width: 0;
			flex: 1;
			margin: 0;

			:first-child {
				margin: 0;
				margin-right: 1rem;
			}
		}
	}

	.payment {
		margin-top: 3.75rem;

		h3 {
			font-size: 1.25rem;
			color: #3c3f4f;
			font-weight: bold;
			margin-bottom: 1.75rem;
		}
	}

	.contact {
		grid-area: phone;
		display: flex;
		margin-top: 3.75rem;
		flex-direction: column;
		display: flex;

		h3 {
			font-size: 1.25rem;
			color: #3c3f4f;
			font-weight: bold;
			margin-bottom: 1.75rem;
		}

		.row {
			fieldset {
				margin: 0;
				:first-child {
					margin: 0;
					margin-right: 1.25rem;
					max-width: 4.25rem;
				}
			}
			flex-direction: row;
			align-items: center;
		}
	}

	.select {
		flex: 1.5;
		label {
			color: #5d5d5d;
			font-size: 1rem;
			font-weight: bold;
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
					font-size: 1rem;
					margin: 0;
				}

				&.error {
					border: 1px solid #fe6969;
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

	@media (max-width: 1400px) {
		> div .info_payment_container p {
			font-size: 1.82rem;
		}
	}

	@media (max-width: 800px) {
		.row {
			flex-direction: column;

			fieldset {
				:first-child {
					margin: 0;
					margin-bottom: 1.9rem;
				}
			}
		}
	}
`;
