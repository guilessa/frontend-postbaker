export default function maskCpf(value, callback) {
	let newValue = value.match(/\d+/g)?.join('') || '';
	const { length } = newValue;
	if (length > 11) {
		return;
	}
	newValue = newValue.replace(/\D/g, '');
	newValue = newValue.replace(/^(\d{3})(\d+)/g, '$1.$2');
	newValue = newValue.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
	newValue = newValue.replace(/^(\d{3})\.(\d{3}).(\d{3})(\d)/g, '$1.$2.$3-$4');
	callback(newValue);
}
