import React, { useEffect } from 'react';
import Layout from '../containers/Layout';
import { Router } from '../routes';
import SignInLayout from '../containers/Auth/SignInLayout';
import { parseCookies } from '../utils';

export default function Signin(props) {
	const { authToken } = props;
	useEffect(() => {
		if (authToken != null) Router.pushRoute('/profile');
	}, []);
	return <Layout authToken={authToken}>{authToken == null && <SignInLayout />}</Layout>;
}

Signin.getInitialProps = async ({ req }) => {
	const cookies = parseCookies(req);
	return {
		authToken: cookies.authToken ? JSON.parse(cookies.authToken) : null
	};
};
