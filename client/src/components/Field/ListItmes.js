import React, { useState, Fragment } from 'react';
import { Form, Button, List, Segment, Label, Icon } from 'semantic-ui-react';

export default function ListItmes(props) {
	const { isEdit, field, callback, setIsEdit, index, isOnlyRead = false } = props;
	const [ data, setData ] = useState(() => initialState(field.data));
	const [ element, setElement ] = useState('');
	function handleChange(type, value) {
		setData({
			...data,
			[type]: value
		});
	}
	function handleSave() {
		callback({ ...field, data }, index);
		setIsEdit((prev) => !prev);
	}
	function submitForm(_e) {
		_e.preventDefault();
		setData({
			...data,
			value: [ ...data.value, element ]
		});
		setElement('');
	}
	function deleteItem(oIdx) {
		let newList = [];
		data.value.map((item, idx) => {
			if (oIdx != idx) newList.push(item);
		});
		setData({
			...data,
			value: newList
		});
	}
	if (isOnlyRead) return <Present data={data} />;
	return (
		<Fragment>
			{isEdit ? (
				<Form onSubmit={submitForm}>
					<Form.Group widths="equal">
						<Form.Input
							label={`Item`}
							placeholder="Item..."
							value={element}
							onChange={(_e, { value }) => setElement(value)}
						/>
						<Form.Select
							label="Size"
							placeholder="Select one..."
							value={data.listType}
							options={[
								{ key: 'ul', value: 'ul', text: 'UL' },
								{ key: 'ol', value: 'ol', text: 'OL' }
							]}
							onChange={(_e, { value }) => handleChange('listType', value)}
						/>
					</Form.Group>

					<Segment>
						{data.value.map((item, idx) => {
							return (
								<Label key={`list_${idx}`}>
									{item}
									<Icon name="delete" onClick={() => deleteItem(idx)} />
								</Label>
							);
						})}
					</Segment>
					<Form.Field />
					<Button type="button" fluid content="Save" color="teal" onClick={handleSave} />
				</Form>
			) : (
				<Present data={data} />
			)}
		</Fragment>
	);
}

const Present = ({ data }) => {
	return (
		<List as={data.listType}>
			{data.value.map((item, idx) => {
				return (
					<List.Item key={`list_${idx}`} as="li">
						{item}
					</List.Item>
				);
			})}
		</List>
	);
};
function initialState(initialValues) {
	return {
		value: [],
		listType: 'ol',
		...initialValues
	};
}
