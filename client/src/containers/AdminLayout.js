import React from 'react';
import Layout from './Layout';
import { Link } from '../routes';
import { Grid, Step, Icon, Divider, Menu, Container, Segment, Button } from 'semantic-ui-react';
export default function AdminLayout({ children, authToken = null }) {
	return (
		<Layout authToken={authToken}>
			<Segment basic>
				<Grid.Row>
					<Grid.Column>
						<Container text>
							<Segment>
								<Link route="profile">
									<Button
										content="Back to profile"
										fluid
										color="teal"
										icon="arrow left"
									/>
								</Link>
								{/* <Button.Group fluid>
									<Button content="Atras" />
									<Button content="Adelante" />
								</Button.Group> */}
							</Segment>
						</Container>
					</Grid.Column>
				</Grid.Row>
				<Grid>
					<Grid.Row>
						<Grid.Column>{children}</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Layout>
	);
}
