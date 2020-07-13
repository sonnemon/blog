import React, { useState } from 'react';
import Paragraph from './Paragraph';
import Title from './Title';
import Code from './Code';
import Image from './Image';
import ListItmes from './ListItmes';
import { Grid, Button, Popup } from 'semantic-ui-react';
export default function Field(props) {
	const {
		field,
		handleCallbackField,
		index,
		handleRemove,
		changePosition,
		isReadOnly = false
	} = props;
	const [ isEdit, setIsEdit ] = useState(false);
	return (
		<Grid.Row columns={1} style={{ marginBottom: '20px' }}>
			{!isReadOnly && (
				<Grid.Column>
					<Popup
						content="Remove"
						trigger={
							<Button
								floated="right"
								color="red"
								icon="trash"
								onClick={() => handleRemove(index)}
							/>
						}
					/>
					<Popup
						content="Edit"
						trigger={
							<Button
								floated="right"
								color="blue"
								icon="edit"
								disabled={isEdit}
								onClick={() => setIsEdit((prev) => !prev)}
							/>
						}
					/>
					<Popup
						content="Down"
						trigger={
							<Button
								floated="right"
								icon="arrow down"
								onClick={() => changePosition(index, index + 1)}
							/>
						}
					/>
					<Popup
						content="Up"
						trigger={
							<Button
								floated="right"
								icon="arrow up"
								onClick={() => changePosition(index, index - 1)}
							/>
						}
					/>
				</Grid.Column>
			)}
			<Grid.Column>
				{field.type == 'title' && (
					<Title
						field={field}
						isEdit={isEdit}
						callback={handleCallbackField}
						setIsEdit={setIsEdit}
						index={index}
					/>
				)}
				{field.type == 'paragraph' && (
					<Paragraph
						field={field}
						isEdit={isEdit}
						callback={handleCallbackField}
						setIsEdit={setIsEdit}
						index={index}
					/>
				)}
				{field.type == 'code' && (
					<Code
						field={field}
						isEdit={isEdit}
						callback={handleCallbackField}
						setIsEdit={setIsEdit}
						index={index}
					/>
				)}
				{field.type == 'image' && (
					<Image
						field={field}
						isEdit={isEdit}
						callback={handleCallbackField}
						setIsEdit={setIsEdit}
						index={index}
					/>
				)}
				{field.type == 'list' && (
					<ListItmes
						field={field}
						isEdit={isEdit}
						callback={handleCallbackField}
						setIsEdit={setIsEdit}
						index={index}
					/>
				)}
			</Grid.Column>
		</Grid.Row>
	);
}
