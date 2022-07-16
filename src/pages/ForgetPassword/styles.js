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

		span {
			display: block;
			font-size: 1.25rem;
			color: #707070;
			opacity: 0.3;
			font-weight: 500;
		}
	}

	@media (max-width: 1400px) {
		padding: 2.25rem 2.62rem 5rem 9.37rem;

		span {
			font-size: 1.25rem;
		}
	}

	@media (max-width: 800px) {
		padding: 0.56rem 2.34rem;
	}
`;
