export function nameEncode(name = '') {
	let url = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	url = url.replace(/ /g, '-');
	url = url.toLowerCase();
	url = url.replace(/[^A-Za-z0-9!-]+/, '');
	return url;
}
