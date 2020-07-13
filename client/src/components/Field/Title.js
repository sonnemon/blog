import React, { useState, Fragment } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';

export default function Title(props) {
	const { isEdit, field, callback, setIsEdit, index, isOnlyRead = false } = props;

	const [ data, setData ] = useState(() => initialState(field.data));
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
	if (isOnlyRead) return <Present data={data} />;

	return (
		<Fragment>
			{isEdit ? (
				<Form onSubmit={(_e) => _e.preventDefault()}>
					<Form.Input
						label="Title"
						placeholder="Title..."
						value={data.value}
						onChange={(_e, { value }) => handleChange('value', value)}
					/>
					<Form.Select
						label="Size"
						placeholder="Select one..."
						value={data.size}
						options={[
							{ key: 'h1', value: 'h1', text: 'H1' },
							{ key: 'h2', value: 'h2', text: 'H2' },
							{ key: 'h3', value: 'h3', text: 'H3' },
							{ key: 'h4', value: 'h4', text: 'H4' },
							{ key: 'h5', value: 'h5', text: 'H5' },
							{ key: 'h6', value: 'h6', text: 'H6' }
						]}
						onChange={(_e, { value }) => handleChange('size', value)}
					/>
					<Form.Select
						label="Align"
						placeholder="Select one..."
						value={data.align}
						options={[
							{ key: 'left', value: 'left', text: 'Left' },
							{ key: 'center', value: 'center', text: 'Center' },
							{ key: 'right', value: 'right', text: 'Right' }
						]}
						onChange={(_e, { value }) => handleChange('align', value)}
					/>
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
		<Header textAlign={data.align} as={data.size}>
			{data.value}
		</Header>
	);
};
function initialState(initialValues) {
	return {
		value: '',
		size: 'h1',
		align: 'left',
		...initialValues
	};
}
