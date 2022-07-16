import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { useEffect, useState, useContext, useCallback } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { useParams, useHistory } from 'react-router-dom';

import Container, { Header } from './styles';

import Button from '../../components/Button';
import DeleteItem from '../../components/DeleteItem';
import EditPost from '../../components/EditPost';
import NewPost from '../../components/NewPost';
import RatingPost from '../../components/RatingPost';
import Row from '../../components/Row';
import api from '../../config/api';
import Modal from '../../Container/Modal';
import { Context } from '../../services/context';

const ClientConfig = () => {
	const history = useHistory();
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalNewPost, setShowModalNewPost] = useState(false);
	const [client, setClient] = useState({});
	const [posts, setPosts] = useState([]);
	const [postsArchived, setPostsArchived] = useState([]);
	const [arquiveds, setArquiveds] = useState(false);
	const [editValues, setEditValues] = useState({});
	const [showModalRating, setShowModalRating] = useState({
		show: false,
		value: {},
	});
	const [deleteItem, setDeleteItem] = useState({
		show: false,
		id: -1,
		name: '',
	});
	const params = useParams();
	const {
		handleShowPopUp,
		handleShowModal,
		clients,
		fetchMoreClients,
		user,
	} = useContext(Context);

	const fetchPosts = useCallback(() => {
		async function fetchData() {
			if (clients.length <= 0) {
				return;
			}
			const newClient = clients.find(
				clientI => clientI.id === Number(params.id)
			);
			if (!newClient?.id) {
				history.goBack();
				return;
			}

			const statusPaid = await api.get(
				`pagarme/client_subscription/${newClient.id}`
			);
			if (
				statusPaid?.data?.status !== 'paid' &&
				statusPaid?.data?.status !== 'trialing'
			) {
				history.replace('/dashboard/erro-pagarme');
				return;
			}
			setClient(newClient);

			try {
				if (!newClient?.accessHash) {
					return;
				}
				const response = await api.get(
					`clients/${newClient.accessHash}/posts/`
				);
				const postsFormat = response.data.map(post => {
					let statusText = 'Aprovado pelo cliente';

					if (post.status === 'CANCELED') statusText = 'Reprovado';
					if (post.status === 'NONE') statusText = 'Sem status';
					if (post.status === 'ATTENTION') statusText = 'Atenção';

					const newComments = post.comments.map(comment => ({
						...comment,
						dataFormat: format(
							parseISO(comment.createdAt),
							"d eeeeee, 'de' MMMM 'às' HH:mm",
							{
								locale: ptBr,
							}
						),
					}));

					const files = post.files.map(file => ({
						...file,
						file: `${process.env.REACT_APP_DJANGO_MEDIA_URL}/${file.file}`,
					}));

					return {
						...post,
						statusText,
						files,
						comments: newComments,
						dateFormat: format(
							parseISO(post.postingDate),
							"d eeeeee, dd 'de' MMMM 'às' HH:mm",
							{
								locale: ptBr,
							}
						),
					};
				});
				const postsFormatNotArchived = postsFormat.filter(
					post => !post.archive
				);
				const postsFormatArchived = postsFormat.filter(post => post.archive);
				setPosts(postsFormatNotArchived);
				setPostsArchived(postsFormatArchived);
			} catch {}
		}
		fetchData();
	}, [clients, params]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return (
		<Container>
			<Modal
				background={false}
				showModal={showModalRating.show}
				handleOutClick={() => setShowModalRating({ show: false, value: {} })}
			>
				<RatingPost
					user={user}
					values={showModalRating.value}
					clientToken=""
					closeModal={() => setShowModalRating({ show: false, value: {} })}
					updatePosts={(id, object) => {
						const newPosts = posts.map(value => {
							if (value.id === id) {
								return object;
							}
							return value;
						});
						setPosts(newPosts);
					}}
				/>
			</Modal>
			<Modal
				showModal={deleteItem.show}
				handleOutClick={() =>
					setDeleteItem(props => ({
						...props,
						show: false,
					}))
				}
			>
				<DeleteItem
					item={{
						name: deleteItem.name,
						id: deleteItem.id,
						type: deleteItem.type,
					}}
					handleDeleteItem={(id, type) => {
						if (type === 'client') {
							fetchMoreClients();
							history.replace('/dashboard');
							return;
						}
						setDeleteItem(props => ({
							...props,
							show: false,
						}));
						const newPosts = posts.filter(value => value.id !== id);
						setPosts(newPosts);
					}}
					handleNotDeleteItem={() =>
						setDeleteItem(props => ({
							...props,
							show: false,
						}))
					}
				/>
			</Modal>
			<Modal
				showModal={showModalEdit}
				handleOutClick={() => setShowModalEdit(false)}
			>
				<EditPost
					deletePost={id => {
						setShowModalEdit(false);
						setDeleteItem({ id, name: 'post', show: true, type: 'post' });
					}}
					editValues={editValues}
					saveClient={() => {
						fetchPosts();
						setShowModalEdit(false);
					}}
					editClient
					handleClose={() => setShowModalEdit(false)}
					clientInfo={client}
				/>
			</Modal>
			<Modal
				showModal={showModalNewPost}
				handleOutClick={() => setShowModalNewPost(false)}
			>
				<NewPost
					clientInfo={client}
					savePost={() => setShowModalNewPost(false)}
					editClient
					handleClose={() => setShowModalNewPost(false)}
				/>
			</Modal>
			<Header>
				<div className="title">
					<p>Dashboard</p>
					<h2>{client?.name || 'Cliente'}</h2>
				</div>
				<div className="share">
					<p>Link de compartilhamento com o cliente</p>
					<div className="input_container">
						<p>{client?.accessHash || ''}</p>
						<button
							onClick={async () => {
								if (!client?.accessHash) {
									return;
								}
								const getUrl = window.location;
								await navigator.clipboard.writeText(
									`${getUrl.protocol}//${getUrl.host}/${client.accessHash}`
								);
								handleShowPopUp('sucess', 'Link copiado!');
							}}
							type="button"
						>
							copiar link
						</button>
					</div>
				</div>
				<button
					type="button"
					onClick={() => {
						const newClient = {
							...client,
							deleteItem: (id, name) => {
								handleShowModal({ show: false, edit: false });
								setDeleteItem({ id, name, show: true, type: 'client' });
							},
						};
						handleShowModal({ show: true, edit: true, client: newClient });
					}}
				>
					<BsFillGearFill size={24} color="#fff" />
				</button>
			</Header>
			<div className="content">
				<div className="container_buttons">
					<Button type="button" onClick={() => setShowModalNewPost(true)}>
						Novo post
					</Button>
					<button
						type="button"
						className={`secondary ${arquiveds ? 'active' : ''}`}
						onClick={() => {
							setArquiveds(!arquiveds);
						}}
					>
						Mostrar arquivados
					</button>
				</div>
				<div className="products">
					{!arquiveds ? (
						<>
							{posts.map(post => (
								<Row
									openPost={() => {
										setShowModalRating({
											show: true,
											value: post,
										});
									}}
									key={post.id}
									image={post.files}
									date={post.dateFormat}
									type={post.type}
									status={post.status}
									statusText={post.statusText}
									hdResponsive
									deleteItem={() => {
										setDeleteItem({ id: post.id, name: 'post', show: true });
									}}
									editItem={() => {
										setShowModalEdit(true);
										setEditValues({
											...post,
										});
									}}
									ratingItem={async () => {
										try {
											await api.patch(`/posts/${post.id}/`, {
												archive: true,
											});
											handleShowPopUp('sucess', 'Post  arquivado');
										} catch {
											handleShowPopUp('error', 'Post não arquivado');
										}
									}}
								/>
							))}
						</>
					) : (
						<>
							{postsArchived.map(post => (
								<Row
									openPost={() => {
										setShowModalRating({
											show: true,
											value: post,
										});
									}}
									key={post.id}
									image={post.files}
									date={post.dateFormat}
									type={post.type}
									status={post.status}
									statusText={post.statusText}
									hdResponsive
									deleteItem={() => {
										setDeleteItem({ id: post.id, name: 'post', show: true });
									}}
									editItem={() => {
										setShowModalEdit(true);
										setEditValues({
											...post,
										});
									}}
									ratingItem={async () => {
										try {
											await api.patch(`/posts/${post.id}/`, {
												archive: !post.archive,
											});
											handleShowPopUp(
												'sucess',
												`Post ${!post.arquive ? 'arquivado' : 'Desarquivado'}`
											);
										} catch {
											handleShowPopUp(
												'error',
												`Post não ${
													!post.arquive ? 'arquivado' : 'Desarquivado'
												}`
											);
										}
									}}
								/>
							))}
						</>
					)}
				</div>
			</div>
			<span>Aprovando postagens desde 2021</span>
		</Container>
	);
};

export default ClientConfig;
