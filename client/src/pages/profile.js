import React, { useState, useEffect } from 'react';
import Layout from '../containers/Layout';
import { getUserLogued } from '../api/user';
import { getList } from '../api/post';
import { parseCookies } from '../utils';
import ProfileLayout from '../containers/Profile/ProfileLayout';
import { Container, Grid, Segment, Card, Icon } from 'semantic-ui-react';
import { Router } from '../routes';

export default function Profile(props) {
	const { authToken, user, postList } = props;
	useEffect(() => {
		if (authToken == null) Router.pushRoute('/signin');
	}, []);
	const [ profile, setProfile ] = useState(user);
	const [ posts, setPosts ] = useState(postList);
	async function reloadProfile(data) {
		setProfile(data);
	}
	async function reloadPosts() {
		console.log('reload profile');
	}
	return (
		<Layout authToken={authToken}>
			<Container>
				<Segment>
					{authToken != null && (
						<ProfileLayout
							profile={profile}
							posts={posts}
							reloadPosts={reloadProfile}
							reloadProfile={reloadProfile}
							authToken={authToken}
						/>
					)}
				</Segment>
			</Container>
		</Layout>
	);
}

Profile.getInitialProps = async ({ req }) => {
	const cookies = parseCookies(req);
	const authToken = cookies.authToken ? JSON.parse(cookies.authToken) : null;
	const posts = await getList({ isPrivate: true }, authToken);
	const user = await getUserLogued({}, authToken);
	return {
		postList: posts,
		user,
		authToken
	};
};
