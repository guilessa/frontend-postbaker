import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	position: relative;

	overflow: auto;
	max-width: 54.3rem;
	max-height: 37.75rem;

	.close_button {
		position: absolute;
		top: -2rem;
		right: 1rem;
		background: none;
		border: none;
		z-index: 2;
	}

	.header_container {
		margin-top: 2rem;
		margin-left: 2rem;
		margin-right: 2rem;

		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		h2 {
			font-size: 2.44rem;
			border: none;
			width: 100%;
			font-weight: bold;
			color: #3c3f4f;
			outline: none;
		}
		button {
			max-width: 15.5rem;
		}
	}

	@media (max-width: 900px) {
		max-width: 36rem;

		.header_container {
			input {
				font-size: 1.44rem;
			}
		}
	}
	@media (max-width: 600px) {
		max-width: 20rem;
		max-height: 80vh;
		margin: 0 3rem;
		.header_container {
			flex-direction: column;
			h2 {
				margin-bottom: 1rem;
			}
		}
	}
`;

export const Form = styled.form`
	display: flex;
	flex: 1;
	flex-direction: column;
	display: flex;
	margin: 0 2rem;
	padding-top: 2.5rem;
	padding-left: 2.5rem;
	padding-right: 2.5rem;
	padding-bottom: 3rem;
	border-top: 1px solid #bbbbbb;

	> p,
	label {
		color: #3c3f4f;
		font-weight: 500;
		margin-bottom: 0.62rem;
	}

	.photo_container {
		display: flex;
		justify-content: space-between;

		> button {
			max-width: 15.5rem;
		}
	}

	.creating {
		display: flex;
		align-items: flex-end;
		gap: 1.5rem;
		margin-bottom: 2.2rem;
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

	@media (max-width: 900px) {
		padding: 2rem 0;
		.creating {
			flex-direction: column;
			align-items: normal;
		}
		.text textarea {
			min-height: 10rem;
		}
	}
`;

export const ContainerCalendar = styled.div`
	position: fixed;
	width: 100vw;
	top: 0;
	left: 0;
	height: 100vh;
	display: ${({ show }) => (show ? 'block' : 'none')};
	z-index: 3;
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
		top: 50%;
		background: #fff;
		left: 50%;
		transform: translate(-50%, -50%);
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

export const InputContainer = styled.div`
	display: flex;
	margin: 2.2rem 0;

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

	> div {
		flex: 1;
		justify-content: center;
	}

	.date {
		background: none;
		border: none;
		flex: 1.3;
		display: flex;
		padding-right: 1.75rem;
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

	@media (max-width: 900px) {
		flex-direction: column;

		.date {
			padding-right: 0;
			margin: 2rem 0;
		}
	}
`;
