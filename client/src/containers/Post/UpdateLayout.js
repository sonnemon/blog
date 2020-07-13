import React, { useState } from 'react';
import AdminLayout from '../AdminLayout';
import FormPost from '../../components/Post/FormPost';
import { Grid, Icon, Divider, Header, Segment } from 'semantic-ui-react';
import Steps from '../../components/Post/Steps';
import { uploadImage } from '../../api/image';
import { createPost, updatePost } from '../../api/post';
import { useSuccesNotification, useErrorNotification } from '../../hooks/useNotification';
import { Router } from '../../routes';
import DetailPost from '../../components/Post/DetailPost';

export default function UpdateLayout(props) {
	const { authToken } = props;
	const [ isLoading, setIsLoading ] = useState(false);
	const [ tab, setTab ] = useState('detail');
	async function callbackPostUpdate(data) {
		setIsLoading(true);
		const postUpdated = await updatePost(
			{
				_id: props.post._id,
				input: {
					...data
				}
			},
			authToken
		);
		if (postUpdated == null) {
			useErrorNotification({ title: 'Post', message: `There's been a problem` });
		} else {
			props.setPost(postUpdated);
			useSuccesNotification({ title: 'Post', message: 'Updated post successful.' });
		}

		setIsLoading(false);
	}
	if (props.user.username != props.post.author.username)
		return <p>No has access edit this post.</p>;

	return (
		<AdminLayout authToken={authToken}>
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<Divider horizontal>
							<Header as="h1">
								<Icon name="newspaper" />
								Update Post
							</Header>
						</Divider>
						<Steps tab={tab} setTab={setTab} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						{tab == 'form' &&
						props.post && (
							<FormPost
								defaultValues={props.post}
								callback={callbackPostUpdate}
								loading={isLoading}
							/>
						)}
						{tab == 'detail' &&
						props.post != null && (
							<Segment loading={isLoading}>
								<Grid>
									<Grid.Row>
										<Grid.Column>
											<DetailPost
												fields={props.post.fields}
												callbackUpdate={callbackPostUpdate}
											/>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Segment>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</AdminLayout>
	);
}
