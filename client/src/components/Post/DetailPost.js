import React, { useState } from 'react';
import { Segment, Grid, Menu, Dropdown, Input, Icon, Button } from 'semantic-ui-react';
import Field from '../Field';
import MenuItems from './MenuItems';
export default function DetailPost({ loading, fields, callbackUpdate }) {
	const [ data, setData ] = useState(fields);

	function handleCallbackField(nData, nIdx) {
		const newList = data.map((item, idx) => {
			if (nIdx == idx) {
				return nData;
			}
			return item;
		});
		setData(newList);
	}
	function handleUpdate() {
		callbackUpdate({ fields: data });
	}
	function callbackChangePosition(index, newIndex) {
		if (newIndex < 0) return false;
		if (newIndex >= data.length) return false;
		let newList = [ ...data ];
		const tmp = newList[index];
		newList[index] = newList[newIndex];
		newList[newIndex] = tmp;
		setData(newList);
	}
	function callbackRemoveField(nIdx) {
		let newList = [];
		data.forEach((element, idx) => {
			if (idx != nIdx) newList.push(element);
		});
		setData(newList);
	}
	function handleAddField(field) {
		const newList = [ ...data, field ];
		setData(newList);
		window.scrollTo(0, document.body.scrollHeight + 500);
	}
	return (
		<Grid stackable columns={2}>
			<Grid.Row>
				<Grid.Column width={4}>
					<MenuItems handleAddField={handleAddField} />
				</Grid.Column>
				<Grid.Column width={12}>
					<Grid celled>
						<Grid.Row>
							<Grid.Column>
								<Button
									fluid
									content="Save Changes"
									size="large"
									color="green"
									onClick={handleUpdate}
									icon={<Icon name="save" />}
								/>
							</Grid.Column>
						</Grid.Row>

						{(data || []).map((field, idx) => {
							return (
								<Field
									key={`field_${idx}`}
									index={idx}
									field={field}
									changePosition={callbackChangePosition}
									handleCallbackField={handleCallbackField}
									handleRemove={callbackRemoveField}
								/>
							);
						})}
						<Grid.Row>
							<Grid.Column>
								<Button
									fluid
									content="Save Changes"
									size="large"
									color="green"
									icon={<Icon name="save" />}
									onClick={handleUpdate}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}
