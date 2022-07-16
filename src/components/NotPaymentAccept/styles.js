import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3rem 5.62rem;
	max-width: 43.75rem;

	p {
		font-size: 2.4rem;
		font-weight: bold;
		color: #3c3f4f;
		max-width: 32.5rem;
		text-align: center;
		margin-top: 1.75rem;
	}

	button {
		margin-top: 2.5rem;
		max-width: 15.5rem;
	}

	@media (max-width: 800px) {
		max-width: 35.75rem;
		padding: 3rem;

		p {
			font-size: 1.4rem;
			max-width: 22.5rem;
		}
	}
	@media (max-width: 500px) {
		max-width: 35.75rem;
		padding: 1rem;

		p {
			font-size: 1rem;
			max-width: 15.5rem;
		}
	}
	@media (max-width: 350px) {
		max-width: 35.75rem;
		padding: 1rem;

		p {
			max-width: 10rem;
		}
	}
`;
