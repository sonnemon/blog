import React from 'react';
import { List, Image, Card, Label, Icon } from 'semantic-ui-react';
export default function CardProfile({ profile, handleChangePicture }) {
	return (
		<Card>
			<Image src={`${process.env.API}${profile.picture}`} wrapped ui={false} />
			<Label attached="top right" onClick={() => handleChangePicture()}>
				<Icon name="edit" />
			</Label>
			<Card.Content>
				<Card.Header>@{profile.username}</Card.Header>
				<Card.Meta>
					<span className="date">{profile.fullName}</span>
				</Card.Meta>
				<Card.Description>{profile.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<List>
					{profile.position && (
						<List.Item
							icon="briefcase"
							content={
								<a target="_blank" href={profile.position}>
									{profile.position}
								</a>
							}
						/>
					)}
					<List.Item
						icon="mail"
						content={<a href={`mailto:${profile.email}`}>{profile.email}</a>}
					/>
					{profile.linkedin && (
						<List.Item
							icon="linkedin"
							content={
								<a target="_blank" href={profile.linkedin}>
									{profile.linkedin}
								</a>
							}
						/>
					)}
					{profile.twitter && (
						<List.Item
							icon="twitter"
							content={
								<a target="_blank" href={profile.twitter}>
									{profile.twitter}
								</a>
							}
						/>
					)}
					{profile.github && (
						<List.Item
							icon="github"
							content={
								<a target="_blank" href={profile.github}>
									{profile.github}
								</a>
							}
						/>
					)}
					{profile.website && (
						<List.Item
							icon="world"
							content={
								<a target="_blank" href={profile.website}>
									{profile.website}
								</a>
							}
						/>
					)}
				</List>
			</Card.Content>
		</Card>
	);
}
