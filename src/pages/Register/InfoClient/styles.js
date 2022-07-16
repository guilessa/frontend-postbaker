import styled from 'styled-components';

export default styled.div`
	.photo_container {
		display: flex;
		flex-direction: column;
		margin-top: 2rem;
		margin-bottom: 1rem;

		p {
			margin: 0;
			margin-bottom: 0.5rem;
			font-weight: 600;
			font-size: 1rem;
		}
	}

	.social_redes {
		display: flex;
		flex-direction: column;
		p {
			margin-top: 1.9rem;
			font-weight: 600;
			font-size: 1rem;
		}
		> div {
			display: flex;
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
	}
	p {
		max-width: 23.3rem;
		margin: 1rem 0;
	}

	> div {
		max-width: 28.5rem;
	}

	.container_buttons {
		margin-top: 1.9rem;
	}
`;
