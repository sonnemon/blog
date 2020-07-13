import React, { useState } from 'react';
import FormLogin from '../../components/FormLogin';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';
import { loginRequest } from '../../api/auth';
import { Router } from '../../routes';
import Cookie from 'js-cookie';

export default function Login() {
	const [ loading, setLoading ] = useState(false);
	async function callbackForm(data) {
		const result = await loginRequest({ input: data });
		if ('error' in result) {
			console.log('Gaa', result);
		} else {
			Cookie.set('authToken', JSON.stringify(result.token));
			Router.pushRoute('/profile');
		}
	}
	return (
		<Container text>
			<Grid textAlign="center" style={{ height: '70vh' }} verticalAlign="middle">
				<Grid.Row>
					<Grid.Column style={{ maxWidth: 450 }}>
						<Segment loading={loading}>
							<Header textAlign="center" as="h2">
								Sing Up
							</Header>
							<FormLogin callback={callbackForm} />
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
}
