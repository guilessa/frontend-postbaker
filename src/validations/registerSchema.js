import * as Yup from 'yup';

import {
	validateNumber,
	validateExpirationDate,
} from '../utils/validationCard';
import validateCpf from '../utils/validationCpf';

export default Yup.object().shape({
	name: Yup.string().required(),
	logo: Yup.mixed().required(),
	email: Yup.string().email().required(),
	phone: Yup.string()
		.matches(/(\(\d{2}\)\s\d{5}-\d{4})|(\(\d{2}\)\s\d{4}-\d{4})/g)
		.required(),
	password: Yup.string()
		.test('len', 'Must be exactly 8 characters', val => val?.length >= 8)
		.required(),
	checkbox: Yup.bool().required(),
	passwordAccess: Yup.string()
		.test('len', 'Must be exactly 8 characters', val => val?.length >= 8)
		.required(),
	companyName: Yup.string().required(),
	cardNumber: Yup.string()
		.matches(/\d{4}\s\d{4}\s\d{4}\s\d{4}/g)
		.test('is-card', 'cartão não é válido', value => validateNumber(value))
		.required(),
	cardCode: Yup.string().max(3).min(3).required(),
	cpf: Yup.string()
		.matches(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/g)
		.test('is-cpf', 'Cpf não é valido', value => {
			if (!value) {
				return false;
			}
			return validateCpf(value);
		})
		.required(),
	cep: Yup.string()
		.matches(/^\d{5}-\d{3}/g)
		.required(),
	adress: Yup.string().required(),
	number: Yup.string().required(),
	state: Yup.string().required(),
	city: Yup.string().required(),
	sigla: Yup.string().required(),
	district: Yup.string().required(),
	cardName: Yup.string().required(),
	vality: Yup.string()
		.required()
		.test('is-vality', 'data não é valida', value =>
			validateExpirationDate(value)
		),
});
