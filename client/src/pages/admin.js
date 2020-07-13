import React from 'react';
import { parseCookies } from '../utils';
import LayoutAdmin from '../containers/AdminLayout';

export default function Admin(props) {
	console.log(props);
	return (
		<LayoutAdmin>
			<p>Admin Home</p>
		</LayoutAdmin>
	);
}
Admin.getInitialProps = ({ req }) => {
	const cookies = parseCookies(req);
	return {
		authToken: cookies.authToken
	};
};
