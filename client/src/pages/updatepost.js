import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { parseCookies } from '../utils';
import { getOne } from '../api/post';
import jwt from 'jsonwebtoken';
import { Router } from '../routes';
import UpdateLayout from '../containers/Post/UpdateLayout';

function Updatepost(props) {
	const { authToken, router: { query: { _id } } } = props;
	const [ post, setPost ] = useState(null);
	const [ user, setUser ] = useState(null);
	useEffect(() => {
		if (authToken == null) Router.pushRoute('/signin');
		getData();
		try {
			const tokenUser = jwt.decode(authToken);
			setUser(tokenUser.user);
		} catch (error) {
			setUser(null);
		}
	}, []);
	async function getData() {
		const result = await getOne({ _id });
		setPost(result);
	}
	return (
		post != null && (
			<UpdateLayout authToken={authToken} post={post} setPost={setPost} user={user} />
		)
	);
}
Updatepost.getInitialProps = ({ req }) => {
	const cookies = parseCookies(req);
	return {
		authToken: JSON.parse(cookies.authToken)
	};
};
export default withRouter(Updatepost);
