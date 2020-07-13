import React from 'react';
import { Segment, Grid, Menu, Dropdown, Input, Icon } from 'semantic-ui-react';
import { getInitialValueField } from '../../utils';
export default function MenuItems(props) {
	function handleAddField(type) {
		const value = getInitialValueField(type);
		props.handleAddField(value);
	}
	return (
		<Segment basic>
			<Menu vertical fluid>
				{/* <Menu.Item>
				<Input placeholder="Search..." />
			</Menu.Item> */}

				<Menu.Item>
					Fields
					<Menu.Menu>
						<Menu.Item name="search" onClick={() => handleAddField('title')}>
							Title
						</Menu.Item>
						<Menu.Item name="add" onClick={() => handleAddField('paragraph')}>
							Paragraph
						</Menu.Item>
						<Menu.Item name="about" onClick={() => handleAddField('code')}>
							Code
						</Menu.Item>
						<Menu.Item name="about" onClick={() => handleAddField('list')}>
							List
						</Menu.Item>
						<Menu.Item name="about" onClick={() => handleAddField('image')}>
							Image
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			</Menu>
		</Segment>
	);
}
