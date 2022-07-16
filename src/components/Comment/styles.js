import styled from 'styled-components';

export default styled.div`
	width: 100%;
	height: 4rem;
	border-left: 3px solid #e5e5e5;
	display: flex;
	flex-direction: column;
	padding-left: 1rem;
	justify-content: center;

	:not(:last-child) {
		margin-bottom: 1rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		h4 {
			font-size: 0.81rem;
			color: #5d5d5d;
			font-weight: 700;
		}

		span {
			position: relative;
			font-size: 0.5rem;
			font-weight: 300;
		}
	}
	p {
		margin-top: 0.37rem;
		font-size: 0.75rem;
		font-weight: 300;
		color: #5d5d5d;
	}
`;
