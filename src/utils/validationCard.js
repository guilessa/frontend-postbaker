import { number, expirationDate } from 'card-validator';

export const validateNumber = value => {
	if (!value) {
		return;
	}
	return number(value.match(/\d+/g).join('')).card;
};
export const validateExpirationDate = value => {
	if (!value) {
		return;
	}
	return expirationDate(value.match(/\d+/g).join('')).isValid;
};

export default { validateNumber, validateExpirationDate };
