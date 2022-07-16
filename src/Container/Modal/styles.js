import styled from 'styled-components';

export default styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100%;
	max-width: 100vw;
	display: ${({ show }) => (show ? 'flex' : 'none')};
	align-items: center;
	justify-content: center;
	z-index: 4;
	overflow: auto;
	> span {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.77);
	}

	> div {
		background: ${({ background }) => (background ? '#fff' : 'none')};
		z-index: 2;
		border-radius: 8px;
		overflow-x: hidden;
	}
`;
