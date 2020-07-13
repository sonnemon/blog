import React, { useEffect } from 'react';
import Layout from '../containers/Layout';
import SignUpLayout from '../containers/Auth/SignUpLayout';
import { Router } from '../routes';
import { parseCookies } from '../utils';

export default function Singup(props) {
	const { authToken } = props;
	useEffect(() => {
		if (authToken != null) Router.pushRoute('/profile');
	}, []);
	return <Layout authToken={authToken}>{authToken == null && <SignUpLayout />}</Layout>;
}

Singup.getInitialProps = async ({ req }) => {
	const cookies = parseCookies(req);
	return {
		authToken: cookies.authToken ? JSON.parse(cookies.authToken) : null
	};
};
