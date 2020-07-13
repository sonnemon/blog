import React from 'react';
import { Step, Icon } from 'semantic-ui-react';
export default function Steps({ isCreate, setTab, tab }) {
	return (
		<Step.Group stackable="tablet" fluid>
			<Step active={tab == 'form'} onClick={() => setTab('form')}>
				<Icon name="edit" />
				<Step.Content>
					<Step.Title>Basic</Step.Title>
					<Step.Description>Basic information to create a post</Step.Description>
				</Step.Content>
			</Step>
			<Step active={tab == 'detail'} disabled={isCreate} onClick={() => setTab('detail')}>
				<Icon name="object group" />
				<Step.Content>
					<Step.Title>Post body</Step.Title>
					<Step.Description>Components that make up the post</Step.Description>
				</Step.Content>
			</Step>
		</Step.Group>
	);
}
