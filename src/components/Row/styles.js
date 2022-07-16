import styled, { css } from 'styled-components';

export default styled.div`
	width: 100%;
	min-height: 5.87rem;
	border-radius: 8px;
	box-shadow: 0 10px 15px rgba(6, 6, 6, 0.05);
	border: 1px solid rgba(190, 190, 190, 0.23);
	padding: 0 2.25rem 0 5.62rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 2rem;

	> button {
		background: none;
		border: none;
		cursor: pointer;
		width: 100%;
	}

	> div,
	> button {
		display: flex;
		align-items: center;

		.slider {
			width: 4rem !important;
			height: 4rem;
			object-fit: cover;
			margin-right: 2.25rem !important;
		}

		img,
		video {
			width: 4rem;
			height: 4rem;
			object-fit: cover;
			margin-right: 2.25rem;
		}

		p {
			color: #5d5d5d;
			font-weight: 600;
			font-size: 1.25rem;
		}

		&.buttons {
			display: flex;
			align-items: center;

			> div {
				display: flex;
				align-items: center;
			}

			button {
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 100%;
				border: none;

				:not(:last-child) {
					margin-right: 0.81rem;
				}

				&.cancel {
					width: 2.37rem;
					height: 2.37rem;
					background: #fe6969;
					box-shadow: 0 3px 6px rgba(254, 105, 105, 0.28);
				}
				&.edit {
					width: 2.37rem;
					height: 2.37rem;
					background-color: #fee569;
					box-shadow: 0 3px 6px rgba(254, 229, 105, 0.28);
				}
				&.like {
					width: 4rem;
					height: 4rem;
					background: #7f7bfc;
					box-shadow: 0 10px 15px rgba(127, 123, 252, 0.38);
					img {
						width: 1.5rem;
						object-fit: contain;
						margin: 0;
					}
				}
			}
		}
	}

	@media (max-width: 1400px) {
		padding: 0 2.2rem;
	}

	@media (max-width: 1300px) {
		flex-direction: ${({ hdResponsive }) => (hdResponsive ? 'column' : 'row')};
		justify-content: space-between;
		padding: 1rem 2.2rem;
		> button {
			justify-content: ${({ hdResponsive }) =>
				hdResponsive ? 'center' : 'normal'};
		}

		> div {
			width: ${({ hdResponsive }) => (hdResponsive ? '100%' : 'auto')};
			justify-content: space-between;
		}
	}

	@media (max-width: 500px) {
		flex-direction: column;

		> div,
		> button {
			flex-direction: column;
			width: 100%;
			.slider {
				margin: 0 !important;
				margin-bottom: 0.5rem;
				width: 100% !important;
				height: 10rem;
			}
			img,
			video {
				margin: 0;
				margin-bottom: 0.5rem;
				width: 100%;
				height: 10rem;
			}
		}
	}

	@media (max-width: 300px) {
		> div.buttons {
			> div {
				flex-direction: column;
				button {
					margin: 0.5rem 0 !important;
				}
			}
		}
	}
`;

export const Status = styled.span`
	font-size: 1rem;
	padding: 0.5rem 1.75rem;
	color: #fff;
	margin: 0;
	width: 10rem;
	opacity: 1;
	border-radius: 8px;
	margin-right: 1.75rem;

	${({ status }) => {
		switch (status) {
			case 'NONE':
				return css`
					color: #474747;
					background: #f5f5f5;
				`;
			case 'APPROVED':
				return css`
					background-color: #73fe69;
				`;
			case 'ATTENTION':
				return css`
					background-color: #fee569;
				`;
			case 'CANCELED':
				return css`
					background-color: #fe6969;
				`;
			default:
				return css`
					background-color: #fee569;
				`;
		}
	}}

	@media (max-width: 500px) {
		margin: 1rem 0;
	}
`;
