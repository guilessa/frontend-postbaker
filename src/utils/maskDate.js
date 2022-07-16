export default function maskDate(value, callback) {
	let newValue = value.match(/\d+/g)?.join('') || '';
	const { length } = newValue;
	if (length > 4) {
		return;
	}
	newValue = newValue.replace(/\D/g, '');
	newValue = newValue.replace(/^(\d{2})(\d+)/g, '$1/$2');
	callback(newValue);
}
