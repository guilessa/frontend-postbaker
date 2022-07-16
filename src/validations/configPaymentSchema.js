import * as Yup from 'yup';

import {
	validateExpirationDate,
	validateNumber,
} from '../utils/validationCard';

export default Yup.object().shape({
	name: Yup.string().required(),
	numberCard: Yup.string()
		.matches(/\d{4}\s\d{4}\s\d{4}\s\d{4}/g)
		.test('is-card', 'cartão não é válido', value => validateNumber(value))
		.required(),
	codeCard: Yup.string().max(3).min(3).required(),

	vality: Yup.string()
		.required()
		.test('is-vality', 'data não é valida', value =>
			validateExpirationDate(value)
		),
});
