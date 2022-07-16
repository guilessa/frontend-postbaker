import styled from 'styled-components';

export default styled.div`
	width: 8.94rem;
	height: 8.94rem;
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 100%;
	}

	div {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		border-radius: 100%;
		border: 2px solid ${({ error }) => (error ? '#fe6969' : '#e4e4e4')};
	}
`;
