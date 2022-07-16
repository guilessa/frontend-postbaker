import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;

	> div {
		:first-child {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ee4266;
			flex: 1;

			img {
				width: 13.19rem;
				object-fit: contain;
			}
		}
	}
	@media (max-width: 800px) {
		> div {
			:first-child {
				img {
					width: 9rem;
					object-fit: contain;
				}
			}
		}
	}
	@media (max-width: 500px) {
		> div {
			:first-child {
				display: none;
			}
		}
	}
`;

export const ContainerProduct = styled.div`
	display: flex;
	overflow: auto;
	flex: 1;
	position: relative;
`;
