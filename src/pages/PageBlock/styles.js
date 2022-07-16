import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3rem 5.62rem;
	width: 100vw;
	height: 100vh;

	> div {
		width: 100%;
		max-width: 43.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

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
		> div {
			max-width: 35.75rem;
			padding: 3rem;
		}

		p {
			font-size: 1.4rem;
			max-width: 22.5rem;
		}
	}
	@media (max-width: 500px) {
		> div {
			max-width: 35.75rem;
			padding: 1rem;
		}

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
