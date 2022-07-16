import styled from 'styled-components';

export default styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 2;
	> div {
		max-width: 28.75rem;
		display: flex;
		flex-direction: column;

		h1 {
			color: #3c3f4f;
			font-size: 3.1rem;
			font-weight: 700;
		}
		p {
			max-width: 23.3rem;
			font-weight: 500;
			color: #5d5d5d;
			margin: 1rem 0;
		}
		button {
			max-width: 20.6rem;
		}
	}

	@media (max-width: 800px) {
		> div {
			align-items: center;
			margin: 0.5rem;
			h1 {
				font-size: 2rem;
				text-align: center;
			}
		}
	}
`;
