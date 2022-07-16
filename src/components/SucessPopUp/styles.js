import styled, { css } from 'styled-components';

export default styled.span`
	display: flex;
	align-items: center;
	padding-left: 3rem;
	padding-right: 3rem;
	width: 100%;
	max-width: 32.13rem;
	height: 4.69rem;
	border-radius: 8px;
	opacity: 0.7;
	position: fixed;
	right: 1.12rem;
	top: 6rem;
	z-index: 10;
	transition: transform 0.3s linear;

	${({ show }) =>
		!show &&
		css`
			transform: translateX(110%);
		`}

	${({ type }) => {
		switch (type) {
			case 'sucess':
				return css`
					background: #30a22c;
				`;
			case 'error':
				return css`
					background: #fe6969;
				`;
			default:
				return css`
					background: #30a22c;
				`;
		}
	}}

	p {
		color: #fff;
		font-weight: 500;
	}
`;
