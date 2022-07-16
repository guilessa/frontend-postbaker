import styled from 'styled-components';

export default styled.main`
	display: flex;
	flex-direction: column;
	padding: 5.37rem 10.7rem;
	overflow: auto;
	flex: 1;

	.content {
		display: flex;
		flex-direction: column;
		border-top: 1px solid #bbbbbb;
		padding-top: 2rem;

		.container_buttons {
			display: flex;
			align-items: center;
			> button {
				max-width: 15.5rem;
			}

			.secondary {
				cursor: pointer;
				width: auto;
				text-decoration: none;
				background: none;
				border: none;
				font-weight: 500;
				font-size: 1rem;
				color: #ee4266;
				margin-left: 2rem;
				height: 3rem;
				width: 100%;

				&.active {
					border: 1px solid #ee4266;
					border-radius: 8px;
				}
			}
		}

		.products {
			margin-top: 2rem;
		}
	}

	> span {
		display: block;
		font-size: 1.25rem;
		color: #707070;
		opacity: 0.3;
		font-weight: 500;
		align-self: center;
		margin-top: auto;
	}

	@media (max-width: 1700px) {
		padding: 3rem 5.01rem;
	}
	@media (max-width: 1400px) {
		padding: 2rem 4.01rem;
	}

	@media (max-width: 1300px) {
		.header {
			flex-direction: column;

			.share {
				align-self: center;
				margin-top: 2rem;
			}
		}
	}

	@media (max-width: 800px) {
		padding: 1rem;
		.content .container_buttons {
			flex-direction: column;
			.secondary {
				margin: 0;
				margin-top: 2rem;
			}
		}
	}
`;

export const Header = styled.div`
	display: grid;
	grid-template:
		'title input button' / minmax(13.8rem, 1fr) minmax(10rem, 28.25rem)
		4rem;
	justify-content: space-between;
	margin-bottom: 3.12rem;
	align-items: center;
	column-gap: 2rem;
	.title {
		grid-area: title;
		margin-bottom: 1.5rem;
		overflow: hidden;
		p {
			font-size: 1.25rem;
			color: #5d5d5d;
			font-weight: 300;
		}

		h2 {
			font-size: 2.5rem;
			color: #3c3f4f;
			font-weight: bold;
		}
	}

	.share {
		grid-area: input;
		max-width: 28.25rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;

		p {
			font-size: 0.81rem;
			margin-bottom: 0.5rem;
		}
		.input_container {
			margin-bottom: 1.5rem;
			height: 3rem;
			width: 100%;
			border: 1px solid #bebebe;
			border-radius: 8px;
			display: flex;
			align-items: center;
			padding-right: 1.75rem;
			overflow: hidden;

			button {
				border: none;
				background: none;
				min-width: 5.56rem;
				font-size: 1rem;
				font-weight: bold;
				color: #5d5d5d;
				cursor: pointer;
				transition: opacity 0.2s linear;

				:hover {
					opacity: 0.9;
				}
			}

			p {
				padding-left: 1.75rem;
				flex: 1;
				display: flex;
				align-items: center;
				width: 100%;
				align-self: stretch;
				border: none;
				outline: none;
				font-size: 1rem;
				color: #5d5d5d;
				margin: 0;
				font-weight: 500;
			}
		}
	}
	> button {
		display: flex;
		align-items: center;
		justify-content: center;
		grid-area: button;
		cursor: pointer;
		min-width: 4rem;
		max-width: 4rem;
		min-height: 4rem;
		max-height: 4rem;
		border-radius: 100%;
		background: #fcda7b;
		border: none;
		box-shadow: 0 10px 15px rgba(252, 218, 123, 0.38);
	}

	@media (max-width: 1000px) {
		grid-template:
			'title  button' 1fr
			'input input' 1fr;
		> button {
			justify-self: flex-end;
		}
		.share {
			max-width: 100%;
		}
	}

	@media (max-width: 500px) {
		.title h2 {
			font-size: 1.7rem;
		}
	}

	@media (max-width: 400px) {
		grid-template:
			'button  button' 1fr
			'title  title' 1fr
			'input input' 1fr;
		> button {
			justify-self: flex-start;
		}
	}
`;
