import PropTypes from 'prop-types';

import Container from './styles';

const Comment = ({ comment }) => (
	<Container className="comment_box">
		<header>
			{comment.writer === 'USER' && <h4>Equipe</h4>}
			{comment.writer === 'CLIENT' && <h4>Cliente</h4>}
			<span>{comment.dataFormat}</span>
		</header>
		<p>{comment.message}</p>
	</Container>
);

Comment.propTypes = {
	comment: PropTypes.object.isRequired,
};

export default Comment;
