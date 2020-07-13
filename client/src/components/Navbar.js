import React from 'react';
import Cookie from 'js-cookie';
import { Segment, Container, Button, Menu, Responsive, Icon } from 'semantic-ui-react';
import { Link } from '../routes';
export default function Navbar({ authToken }) {
	return (
		<Segment inverted basic style={{ marginBottom: '0', marginTop: '0' }}>
			<Container>
				<Menu stackable widths={4} inverted secondary>
					<Link route="home">
						<Menu.Item as="a">
							<img src="/public/icon-big-outline.png" />
						</Menu.Item>
					</Link>

					<Menu.Item> Categories</Menu.Item>

					{authToken ? (
						<Link route="/profile">
							<Menu.Item>Profile</Menu.Item>
						</Link>
					) : (
						<Link route="/signup">
							<Menu.Item>Sign Up / Sing In</Menu.Item>
						</Link>
					)}
					{authToken && (
						<Link route="home">
							<Menu.Item onClick={() => Cookie.set('authToken', null)}>
								Logout
							</Menu.Item>
						</Link>
					)}
				</Menu>
			</Container>
		</Segment>
	);
}
