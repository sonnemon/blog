import React, { useState } from 'react';
import AdminLayout from '../AdminLayout';
import FormPost from '../../components/Post/FormPost';
import { Grid, Icon, Divider, Header } from 'semantic-ui-react';
import Steps from '../../components/Post/Steps';
import { uploadImage } from '../../api/image';
import { createPost } from '../../api/post';
import { Router } from '../../routes';

export default function CreateLayout(props) {
	const { authToken } = props;
	const [ isLoading, setIsLoading ] = useState(false);
	async function callbackFormPost(data) {
		const post = await createPost({ input: data }, authToken);
		if (post == null) {
		} else {
			Router.pushRoute(`/editor/post/update/${post._id}`);
		}
	}
	return (
		<AdminLayout authToken={authToken}>
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<Divider horizontal>
							<Header as="h1">
								<Icon name="newspaper" />
								Create Post
							</Header>
						</Divider>
						<Steps isCreate />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<FormPost isCreate callback={callbackFormPost} loading={isLoading} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</AdminLayout>
	);
}
