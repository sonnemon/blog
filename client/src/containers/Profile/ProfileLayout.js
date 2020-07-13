import React, { useState, Fragment } from 'react';
import FormModal from './FormModal';
import CardProfile from './CardProfile';
import ModalPicture from './ModalPicture';
import { updateProfile } from '../../api/user';
import { uploadUserPicture } from '../../api/image';
import { Link } from '../../routes';
import { Button, Grid, Label, Icon, Header, Table, Popup, Segment } from 'semantic-ui-react';
import { useSuccesNotification, useErrorNotification } from '../../hooks/useNotification';

export default function ProfileLayout(props) {
	const { profile, posts, reloadProfile, reloadPosts, authToken } = props;
	const [ isModalOpen, setIsModalOpen ] = useState(false);
	const [ isPictureModalOpen, setIsPictureModalOpen ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	async function handleModalCallback(isSuccess, data = {}) {
		setLoading(true);
		if (isSuccess) {
			const newProfile = await updateProfile({ input: data }, authToken);
			if (newProfile == null) {
				useErrorNotification({ title: 'Profile', message: `There's been a problem` });
			} else {
				reloadProfile(newProfile);
				useSuccesNotification({ title: 'Profile', message: 'Profiled updated' });
			}
		}
		setIsModalOpen((prev) => !prev);
		setLoading((prev) => !prev);
	}
	async function handlePictureModalCallback(isSuccess, picture) {
		setLoading(true);
		if (isSuccess) {
			const userPicture = await uploadUserPicture(picture);
			const newProfile = await updateProfile({ input: { picture: userPicture } }, authToken);
			if (newProfile == null) {
				useErrorNotification({ title: 'Profile', message: `There's been a problem` });
			} else {
				reloadProfile(newProfile);
				useSuccesNotification({ title: 'Profile', message: 'Profiled updated' });
			}
			console.log(userPicture);
		}
		setIsPictureModalOpen((prev) => !prev);
		setLoading((prev) => !prev);
	}
	return (
		<Fragment>
			<Grid>
				<Grid.Row columns={2}>
					<Grid.Column width={5}>
						<CardProfile
							profile={profile}
							handleChangePicture={() => setIsPictureModalOpen((prev) => !prev)}
						/>
					</Grid.Column>
					<Grid.Column width={11}>
						<Grid celled>
							<Grid.Row columns={2} centered>
								<Grid.Column textAlign="center">
									<a onClick={() => setIsModalOpen((prev) => !prev)}>
										<p>
											<Icon.Group size="huge">
												<Icon name="puzzle" />
												<Icon corner="bottom right" name="add" />
											</Icon.Group>
										</p>
										<Header as="h2" icon>
											EditProfile
										</Header>
									</a>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<Segment basic>
										<Link route="createpost">
											<Button
												as="a"
												content={`Whrite a new post.`}
												fluid
												size="large"
												color="violet"
											/>
										</Link>
									</Segment>
									<Header as="h3">Posts</Header>
									<Table celled padded>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>Title</Table.HeaderCell>
												<Table.HeaderCell>State</Table.HeaderCell>
												<Table.HeaderCell>Actions</Table.HeaderCell>
											</Table.Row>
										</Table.Header>

										<Table.Body>
											{posts.map((post, idx) => {
												return (
													<Table.Row key={`table_row_${idx}`}>
														<Table.Cell>
															<p>{post.title}</p>
														</Table.Cell>
														<Table.Cell>
															{post.status ? (
																<Label color="blue" horizontal>
																	Publish
																</Label>
															) : (
																<Label color="teal" horizontal>
																	Hidden
																</Label>
															)}
														</Table.Cell>
														<Table.Cell>
															<Link
																route={`/editor/post/update/${post._id}`}
															>
																<Button
																	as="a"
																	icon="edit"
																	color="blue"
																/>
															</Link>
															<Popup
																content="Delete post"
																trigger={
																	<Button
																		icon="trash"
																		color="red"
																	/>
																}
															/>
														</Table.Cell>
													</Table.Row>
												);
											})}
										</Table.Body>
									</Table>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<FormModal
				profile={profile}
				callback={handleModalCallback}
				open={isModalOpen}
				loading={loading}
			/>
			{profile.picture && (
				<ModalPicture
					open={isPictureModalOpen}
					picture={profile.picture}
					callback={handlePictureModalCallback}
				/>
			)}
		</Fragment>
	);
}
