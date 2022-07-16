export default function maskPhone(value, callback, options = { ddd: true }) {
	const maxLength = options.ddd ? 11 : 9;
	let newValue = value.match(/\d+/g)?.join('') || '';
	const { length } = newValue;
	if (length > maxLength) {
		return;
	}
	if (options.ddd) {
		newValue = newValue.replace(/\D/g, '');
		newValue = newValue.replace(/^(\d{2})(\d+)/g, '($1) $2');
		newValue = newValue.replace(/^\((\d{2})\)\s(\d{4})(\d)/g, '($1) $2-$3');
		newValue = newValue.replace(
			/^\((\d{2})\)\s(\d{4})-(\d)(\d{4})/g,
			'($1) $2$3-$4'
		);
	} else {
		newValue = newValue.replace(/\D/g, '');
		newValue = newValue.replace(/^(\d{4})(\d+)/g, '$1-$2');
		newValue = newValue.replace(/^(\d{4})-(\d{1})(\d{4})/g, '$1$2-$3');
	}
	callback(newValue);
}
