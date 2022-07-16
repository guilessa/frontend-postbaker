import { useContext, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link, useHistory, useLocation } from 'react-router-dom';

import Container from './styles';

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
					<Link to="/dashboard/configuracao" className="comment">
						<div>
							<span>Você está logado como</span>
							<p>{user?.name || 'Usuário'} </p>
						</div>
						<RiArrowRightSLine color="#FCDA7B" size={32} />
					</Link>

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
