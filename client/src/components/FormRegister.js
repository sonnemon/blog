import React, { useState, useEffect } from 'react';
import { Link } from '../routes';
import { validateEmail } from '../utils';
import { Button, Input, Form, Message, Divider } from 'semantic-ui-react';
export default function FormRegister(props) {
	const { callback, loading, setCodeError } = props;
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ errors, setErrors ] = useState('');

	function handleSubmit(_e) {
		_e.preventDefault();
		setCodeError(null);
		setErrors([]);
		let listErros = [];
		if (username.length < 3) {
			listErros.push('Username must have at least 3 characters');
		}
		if (password.length < 6) {
			listErros.push('Password must have at least 6 characters');
		}
		if (email.length < 6) {
			listErros.push('Enter a correct email');
		} else if (!validateEmail(email)) {
			listErros.push('Enter a correct email');
		}
		if (listErros.length == 0) {
			callback({
				username,
				password,
				email
			});
		} else {
			setErrors(listErros);
		}
	}
	return (
		<Form onSubmit={handleSubmit} loading={loading}>
			<Form.Field>
				<label>Username</label>
				<Input
					icon="user"
					placeholder="Username..."
					value={username}
					onChange={(e, { value }) => setUsername(value)}
				/>
			</Form.Field>
			<Form.Field>
				<label>Email</label>
				<Input
					icon="at"
					placeholder="Email..."
					value={email}
					onChange={(e, { value }) => setEmail(value)}
				/>
			</Form.Field>
			<Form.Field>
				<label>Password</label>
				<Input
					icon="lock"
					placeholder="Password..."
					value={password}
					type="password"
					onChange={(e, { value }) => setPassword(value)}
				/>
			</Form.Field>
			<Button color="green" fluid type="submit">
				Enviar
			</Button>
			<Divider horizontal>O</Divider>
			<Link route="signup">
				<Button as="a" fluid color="blue">
					Sign Up
				</Button>
			</Link>
			{errors.length > 0 && (
				<Message color="red" header="Corrija los siguientes errores" list={errors} />
			)}
		</Form>
	);
}
