import React, { useState } from 'react';
import FormRegister from '../../components/FormRegister';
import { registerUser } from '../../api/auth';
import { Grid, Segment, Header, Container, Message } from 'semantic-ui-react';

export default function SignInLayout({ authToken }) {
	const [ loading, setLoading ] = useState(false);
	const [ isSuccesRegister, setIsSuccesRegister ] = useState(false);
	const [ codeError, setCodeError ] = useState(null);
	async function callbackForm(data) {
		// setLoading(true);
		const resultRegisterUser = await registerUser({ input: data }, authToken);
		if (resultRegisterUser.error) {
			if (resultRegisterUser.code == 'USERNAME_ALREADY_EXIST') {
				setCodeError('USERNAME ALREADY EXIST');
			} else if (resultRegisterUser.code == 'EMAIL_ALREADY_EXIST') {
				setCodeError('EMAIL ALREADY EXIST');
			} else {
				setCodeError('REGISTER FAILED, TRY LATTER.');
			}
		} else {
			setIsSuccesRegister(true);
		}
		setLoading(false);
	}
	return (
		<Container>
			<Grid textAlign="center" style={{ height: '70vh' }} verticalAlign="middle">
				<Grid.Row>
					<Grid.Column style={{ maxWidth: 450 }}>
						<Segment loading={loading}>
							<Header as="h2" textAlign="center">
								Sing In
							</Header>
							{!isSuccesRegister && (
								<FormRegister
									callback={callbackForm}
									loading={loading}
									setCodeError={setCodeError}
								/>
							)}
							{isSuccesRegister && (
								<Message
									success
									header="Your user registration was successful"
									content="Now wait for the admin to validate your registration"
								/>
							)}
							{codeError != null && (
								<Message
									color="red"
									header="Registration failed"
									content={codeError}
								/>
							)}
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
}
