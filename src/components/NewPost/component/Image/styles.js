import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
	from{
		transform:rotateZ(0)
	}
	to{
		transform:rotateZ(360deg)
	}
`;

export default styled.div`
	flex: 2;
	height: 3rem;
	cursor: pointer;

	position: relative;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	span,
	button {
		transform: translateY(-50%);
		align-self: flex-end;
		position: absolute;

		top: 50%;
		display: block;
		right: 1rem;
	}

	button {
		cursor: pointer;
		color: #fe6969;
		background: none;
		transform: none;
		bottom: -1.5rem;
		height: fit-content;
		top: auto;
		z-index: 2;
		border: none;
		font-weight: bold;

		:hover {
			opacity: 0.9;
		}
	}

	> div > div {
		background: rgba(118, 169, 236, 0.15);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		border: 2px dashed ${({ active }) => (active ? '#23B123' : '#76a9ec')};
		border-radius: 0.5rem;

		span svg {
			animation: ${rotate} 2s infinite;
		}
		img,
		video {
			width: 2rem;
			height: 2rem;
			border-radius: 100%;
			margin-right: 1rem;
		}
		video {
			object-fit: cover;
		}

		p {
			max-width: 10.5rem;
			overflow: hidden;
			color: ${({ active }) => (active ? '#23B123' : '#76a9ec')};
			font-weight: 500;
			margin: 0;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

		${({ error }) =>
			error &&
			css`
				border-color: #fe6969;

				p {
					color: #fe6969 !important;
				}
			`}
	}
`;
