import React, { useState } from 'react';
import { Link } from '../routes';
import { Button, Input, Form, Message, Divider } from 'semantic-ui-react';

export default function FormLogin(props) {
	const { callback } = props;
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errors, setErrors ] = useState([]);
	function handleSubmit(_e) {
		_e.preventDefault();
		setErrors([]);
		let listErros = [];
		if (username.length < 3) {
			listErros.push('Username must have at least 3 characters');
		}
		if (password.length < 6) {
			listErros.push('Password must have at least 6 characters');
		}
		if (listErros.length == 0) {
			callback({
				username,
				password
			});
		} else {
			setErrors(listErros);
		}
	}
	return (
		<Form onSubmit={handleSubmit}>
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
			<Link route="signin">
				<Button as="a" fluid color="blue">
					Sing In
				</Button>
			</Link>
			{errors.length > 0 && (
				<Message color="red" header="Corrija los siguientes errores" list={errors} />
			)}
		</Form>
	);
}
