import axios from 'axios';
import { useState, useEffect } from 'react';

const useCep = currentCep => {
	const [cepValues, setCepValues] = useState({
		cep: '',
		logradouro: '',
		complemento: '',
		bairro: '',
		localidade: '',
		uf: '',
		ibge: '',
		gia: '',
		ddd: '',
		siafi: '',
	});
	const [error, setError] = useState(false);
	useEffect(() => {
		setError(false);
		let cep = currentCep.match(/\d+/g);
		if (!cep) {
			return;
		}
		cep = cep.join('');
		if (cep.length < 8) {
			return;
		}

		axios
			.get(`https://viacep.com.br/ws/${cep}/json/`)
			.then(({ data }) => {
				if (data?.erro) {
					setError(true);
					return;
				}
				setCepValues(props => ({
					...props,
					cep: data.cep,
					logradouro: data.logradouro,
					ibge: data.ibge,
					gia: data.gia,
					ddd: data.ddd,
					siafi: data.siafi,
					neighborhood: data.bairro,
					complement: data.complemento,
					state: data.uf,
					city: data.localidade,
				}));
			})
			.catch(() => setError(true));
	}, [currentCep]);

	return [cepValues, error];
};

export default useCep;
