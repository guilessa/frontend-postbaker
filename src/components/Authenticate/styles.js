import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3rem 5.62rem;
	max-width: 40.19rem;

	p {
		font-weight: 500;
		color: #3c3f4f;
		max-width: 32.5rem;
		text-align: center;
		margin-top: 0.69rem;
	}

	h3 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #3c3f4f;
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

	button {
		margin-top: 2.5rem;
		max-width: 15.5rem;
	}

	@media (max-width: 800px) {
		padding: 2rem;
		h3 {
			font-size: 2rem;
		}
	}

	@media (max-width: 700px) {
		max-width: 26rem;
	}

	@media (max-width: 500px) {
		max-width: 20rem;
	}
`;
