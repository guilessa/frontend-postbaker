import { useContext, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useHistory, useLocation } from 'react-router-dom';

import Container from './styles';

import informationIcon from '../../assets/icons/information.png';
import userIcon from '../../assets/icons/profile-user.png';
import questionIcon from '../../assets/icons/question.png';
import { Context } from '../../services/context';

const Aside = () => {
	const { menuOpen, handleShowModal, clients, user } = useContext(Context);
	const [clientActiveId, setClientActiveId] = useState(-1);

	const history = useHistory();
	const route = useLocation();

	useEffect(() => {
		const array = route.pathname.split('/');
		const id = array[array.length - 2];
		setClientActiveId(Number(id));
	}, [route]);

	return (
		<>
			<Container openMenu={menuOpen}>
				<div>
					<button
						type="button"
						onClick={() => handleShowModal({ show: true, edit: false })}
					>
						<AiOutlinePlus color="#fff" size={16} />
						<p>Novo Cliente</p>
					</button>
					<h2>Meus Clientes</h2>
				</div>
				<div className="clients">
					{clients.map(client => (
						<button
							type="button"
							onClick={() =>
								history.push(`/dashboard/cliente/${client.id}/post`)
							}
							className={client.id === clientActiveId ? 'active' : ''}
							key={client.id}
						>
							{client.name}
						</button>
					))}
				</div>
				<div>
					<span className="menuInferior">
						<Link to="/dashboard/configuracao" className="comment menuItem">
							<img src={userIcon} alt="Minhas Configurações" className="icon" />
							<p>Minhas Configurações</p>
						</Link>
						<a href="https://faq.postbaker.com.br" className="comment menuItem">
							<img
								src={informationIcon}
								alt="Como funciona?"
								className="icon"
							/>
							<p>Como funciona?</p>
						</a>
						<a
							href="https://postbaker.com.br/ajuda"
							className="comment menuItem"
						>
							<img src={questionIcon} alt="Preciso de ajuda" className="icon" />
							<p>Preciso de ajuda</p>
						</a>
					</span>

					<button
						type="button"
						onClick={() => {
							window.localStorage.clear();

							history.replace('/login');
						}}
					>
						Sair
					</button>
				</div>
			</Container>
		</>
	);
};

export default Aside;
