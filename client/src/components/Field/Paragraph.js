import React, { useState, Fragment } from 'react';
import parser from 'html-react-parser';
import { Form, Button } from 'semantic-ui-react';
export default function Paragraph(props) {
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
					<Form.TextArea
						label="Paragraph"
						placeholder="Paragraph..."
						value={data.value}
						rows={6}
						onChange={(_e, { value }) => handleChange('value', value)}
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
	return <p>{parser(data.value)}</p>;
};
function initialState(initialValues) {
	return {
		value: '',
		...initialValues
	};
}
