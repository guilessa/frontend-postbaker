import styled, { css } from 'styled-components';

export default styled.header`
	display: flex;
	align-items: center;
	padding-left: 3rem;
	width: 100%;
	height: 3.75rem;
	background: #ee4266;

	${({ smart }) =>
		smart &&
		css`
			padding-left: 1rem;
		`}

	> div {
		display: flex;
		align-items: center;

		button {
			cursor: pointer;
			background: none;
			border: none;
		}

		img {
			width: 8.62rem;
			object-fit: contain;
			margin-left: 1rem;
		}
	}
`;
