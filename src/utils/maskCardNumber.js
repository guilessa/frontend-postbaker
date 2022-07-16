export default function maskCardNumber(value, callback) {
	let newValue = value.match(/\d+/g)?.join('') || '';
	if (newValue.length > 16) {
		return;
	}
	newValue = newValue.replace(/\D/g, '');
	newValue = newValue.replace(/^(\d{4})(\d)/g, '$1 $2');
	newValue = newValue.replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3');
	newValue = newValue.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4');

	callback(newValue);
}
