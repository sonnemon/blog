import React from 'react';
import Layout from '../containers/Layout';
import Field from '../components/Field';
import Head from 'next/head';
import { Grid, Header, List, Image, Icon, Container, Button } from 'semantic-ui-react';
import { getOnePublic } from '../api/post';
import { parseCookies } from '../utils';

export default function Post(props) {
	const { post, authToken } = props;
	return (
		<Layout authToken={authToken}>
			<Head>
				<title>{post.title}</title>
				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={post.seed} />
				<meta property="og:url" content={`${process.env.HOST}/post/${post.url}`} />
				<meta property="og:image" content={`${process.env.API}/${post.coverImage}`} />

				<meta name="twitter:title" content={post.title} />
				<meta name="twitter:description" content={post.seed} />
				<meta name="twitter:image" content={`${process.env.API}/${post.coverImage}`} />
			</Head>
			<Container text>
				<Grid columns="equal">
					<Grid.Row />
					<Grid.Row />
					<Grid.Row>
						<Grid.Column>
							<Grid>
								<Grid.Row>
									<Grid.Column>
										<Header textAlign="center" as="h1">
											{post.title}
										</Header>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row columns={2}>
									<Grid.Column>
										<List>
											<List.Item>
												<Image
													avatar
													src={`${process.env.API}${post.author.picture}`}
												/>
												<List.Content>
													<List.Header as="a">
														@{post.author.username}
													</List.Header>
													<List.Description>
														{post.author.position}
													</List.Description>
												</List.Content>
											</List.Item>
										</List>
									</Grid.Column>
									<Grid.Column textAlign="right">
										<div>
											<a
												target="_blank"
												href={`https://www.facebook.com/sharer/sharer.php?u=${process
													.env.HOST}/post/${post.url}`}
											>
												<Icon bordered color="blue" name="facebook" />
											</a>
											<a
												target="_blank"
												href={`https://twitter.com/intent/tweet?url=${process
													.env.HOST}/post/${post.url}`}
											>
												<Icon bordered color="teal" name="twitter" />
											</a>
											<a
												target="_blank"
												href={`https://www.linkedin.com/shareArticle?mini=true&url=${process
													.env.HOST}/post/${post.url}`}
											>
												<Icon bordered color="teal" name="twitter" />
											</a>
										</div>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row columns={1}>
									<Grid.Column style={{ marginBottom: '40px' }}>
										<p>{post.seed}</p>
									</Grid.Column>
									{post.fields.map((field, idx) => {
										return (
											<Field key={`field_${idx}`} field={field} isReadOnly />
										);
									})}
								</Grid.Row>
							</Grid>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</Layout>
	);
}
Post.getInitialProps = async ({ req, query }) => {
	const uniqid = query.url.split('-').pop();
	const post = await getOnePublic({ uniqid });
	const cookies = parseCookies(req);
	return {
		post,
		authToken: cookies.authToken ? JSON.parse(cookies.authToken) : null
	};
};
