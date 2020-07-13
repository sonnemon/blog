import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default function FormModal(props) {
	const { callback, profile, open, loading } = props;
	const [ fields, setFields ] = useState(() => initialState(profile));
	function handleSubmit() {
		callback(true, fields);
	}
	function handleChange(_e, { value, name }) {
		setFields((prev) => ({ ...prev, [name]: value }));
	}
	return (
		<Modal size="tiny" open={open} onClose={() => callback(false)}>
			<Modal.Header>Update Profile</Modal.Header>
			<Modal.Content>
				<Form loading={loading}>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Fullname"
							placeholder="fullname..."
							icon="user"
							name="fullName"
							value={fields.fullName}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Job Position"
							placeholder="job position..."
							icon="briefcase"
							value={fields.position}
							name="position"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Twitter"
							placeholder="twitter..."
							icon="twitter"
							value={fields.twitter}
							name="twitter"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Github"
							placeholder="github..."
							icon="github"
							value={fields.github}
							name="github"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Website"
							placeholder="website..."
							icon="world"
							name="website"
							value={fields.website}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.TextArea
						label="Description"
						placeholder="Tell us more about you..."
						name="description"
						value={fields.description}
						onChange={handleChange}
					/>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={() => callback(false)} disabled={loading}>
					No
				</Button>
				<Button positive content="Accept" onClick={handleSubmit} disabled={loading} />
			</Modal.Actions>
		</Modal>
	);
}

function initialState(currentValues) {
	return {
		fullName: currentValues.fullName,
		position: currentValues.position,
		twitter: currentValues.twitter,
		github: currentValues.github,
		website: currentValues.website,
		description: currentValues.description
	};
}
