import React, { useEffect, useState } from 'react';
import { parseCookies } from '../utils';
import { Router } from '../routes';
import CreateLayout from '../containers/Post/CreateLayout';

export default function Createpost(props) {
	const { authToken } = props;
	useEffect(() => {
		if (authToken == null) Router.pushRoute('/signin');
	}, []);
	return <CreateLayout authToken={authToken} />;
}

Createpost.getInitialProps = ({ req }) => {
	const cookies = parseCookies(req);
	return {
		authToken: cookies.authToken ? JSON.parse(cookies.authToken) : null
	};
};
