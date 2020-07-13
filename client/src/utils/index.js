import cookie from 'cookie';
export function parseCookies(req) {
	return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

export function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export function getInitialValueField(key) {
	let initialValue = {};
	switch (key) {
		case 'title':
			initialValue = {
				type: 'title',
				data: {
					value: '',
					size: 'h1',
					align: 'center'
				}
			};
			break;
		case 'paragraph':
			initialValue = {
				type: 'paragraph',
				data: {
					value: ''
				}
			};
			break;
		case 'code':
			initialValue = {
				type: 'code',
				data: {
					value: ''
				}
			};
			break;
		case 'list':
			initialValue = {
				type: 'list',
				data: {
					value: [],
					listType: 'ul'
				}
			};
			break;
		case 'image':
			initialValue = {
				type: 'image',
				data: {
					value: 'images/posts/display/default.png',
					size: 'small',
					isCentered: true
				}
			};
			break;
		default:
			break;
	}
	return initialValue;
}
