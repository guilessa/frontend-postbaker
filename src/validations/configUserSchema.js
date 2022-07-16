import * as Yup from 'yup';

import validateCpf from '../utils/validationCpf';

export default Yup.object().shape({
	name: Yup.string().required(),
	email: Yup.string().email().required(),
	phone: Yup.string()
		.matches(/(\(\d{2}\)\s\d{5}-\d{4})|(\(\d{2}\)\s\d{4}-\d{4})/g)
		.required(),
	cpf: Yup.string()
		.matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}/g)
		.test('is-cpf', 'Cpf não é valido', value => {
			if (!value) {
				return false;
			}
			return validateCpf(value);
		})
		.required(),
	password: Yup.string(),
	cep: Yup.string(/^\d{5}-\d{3}/g).required(),
	adress: Yup.string().required(),
	number: Yup.string().required(),
	city: Yup.string().required(),
	state: Yup.string().required(),
	bairro: Yup.string().required(),
	sigla: Yup.string().required(),
});
