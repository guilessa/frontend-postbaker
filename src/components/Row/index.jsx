import Carrousel from 'nuka-carousel';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';
import { TiPencil } from 'react-icons/ti';

import Container, { Status } from './styles';

import likeIcon from '../../assets/icons/likeIcon.svg';

const Row = ({
	buttons,
	hdResponsive,
	deleteItem,
	editItem,
	ratingItem,
	date,
	status,
	image,
	type,
	openPost,
}) => (
	<Container hdResponsive={hdResponsive}>
		<button type="button" onClick={openPost}>
			{type === 'VIDEO' && (
				<video preload="metadata">
					<source src={`${image && image[0] && image[0].file}#t=0.5`} />
				</video>
			)}
			{type === 'SINGLE' && (
				<img src={image && image[0] && image[0].file} alt="produto" />
			)}
			{type === 'GALLERY' && (
				<Carrousel
					autoplay
					withoutControls
					defaultControlsConfig={{
						nextButtonStyle: { display: 'none' },
						prevButtonStyle: { display: 'none' },
						pagingDotsStyle: { display: 'none' },
					}}
				>
					{image.map(img => (
						<img key={img.id} src={img && img.file} alt="produto" />
					))}
				</Carrousel>
			)}
			<p>{date}</p>
		</button>
		<div className="buttons">
			<Status status={status}>
				{status === 'CANCELED' && <span>Reprovado</span>}
				{status === 'ATTENTION' && <span>Alteração</span>}
				{status === 'APPROVED' && <span>Aprovado</span>}
				{status === 'NONE' && <span>Sem status</span>}
			</Status>
			{buttons && (
				<div>
					<button onClick={deleteItem} className="cancel" type="button">
						<BsX color="#fff" size={24} />
					</button>
					<button className="edit" type="button" onClick={editItem}>
						<TiPencil color="#fff" size={24} />
					</button>
					<button onClick={ratingItem} className="like" type="button">
						<img src={likeIcon} alt="botao like" />
					</button>
				</div>
			)}
		</div>
	</Container>
);

Row.propTypes = {
	buttons: PropTypes.bool,
	hdResponsive: PropTypes.bool,
	editItem: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	ratingItem: PropTypes.func.isRequired,
	openPost: PropTypes.func,
};

Row.defaultProps = {
	buttons: true,
	hdResponsive: false,
	openPost() {},
};
export default Row;
