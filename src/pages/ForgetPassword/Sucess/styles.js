import styled from 'styled-components';

export default styled.div`
	max-width: 28.19rem;
	h1 {
		color: #3c3f4f;
		font-size: 2.4rem;
		font-weight: 700;
	}
	p {
		max-width: 23.3rem;
		font-weight: 500;
		color: #5d5d5d;
		margin: 1rem 0;
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

			a {
				font-weight: 500;
				color: #2b8ee6;
				font-size: 0.8rem;
				text-decoration: none;
			}
		}
	}
`;
