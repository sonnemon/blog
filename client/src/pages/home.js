import React from "react";
import Layout from "../containers/Layout";
import { Link } from "../routes";
import { getList } from "../api/post";
import {
  Icon,
  Item,
  Grid,
  Header,
  List,
  Segment,
  Container,
  Image,
} from "semantic-ui-react";
import config from "../config";
import { parseCookies } from "../utils";

export default function Home(props) {
  const { posts, authToken } = props;
  return (
    <Layout authToken={authToken}>
      <Segment
        basic
        inverted
        style={{ marginTop: 0, paddingTop: "40px", paddingBottom: "40px" }}
      >
        <Container text>
          <Image centered size="small" src="/public/icon-big-outline.png" />
          <Header
            as="h1"
            content="TEC BLOG"
            textAlign="center"
            style={{
              color: "white",
              fontSize: false ? "2em" : "4em",
              fontWeight: "normal",
              marginBottom: 0,
            }}
          />

          <Header
            textAlign="center"
            as="h2"
            content="Here found post about language programing, frameworks, libraries, etc."
            style={{
              fontSize: false ? "1.5em" : "1.7em",
              fontWeight: "normal",
              color: "white",
            }}
          />
        </Container>
      </Segment>
      <Segment basic>
        <Container>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <Segment basic>
                  <Header as="h2">
                    <Icon.Group>
                      <Icon name="file" />
                      <Icon corner name="zoom" />
                    </Icon.Group>
                    <Header.Content>Categorias</Header.Content>
                  </Header>
                  <List ordered>
                    <List.Item as="a">Soon..</List.Item>
                    {/* <List.Item as="a">Introduction</List.Item>
										<List.Item as="a">Review</List.Item> */}
                  </List>
                </Segment>
              </Grid.Column>
              <Grid.Column width={12}>
                <Segment basic>
                  <Header as="h2">
                    <Icon.Group>
                      <Icon name="mobile" />
                      <Icon corner name="file" />
                    </Icon.Group>
                    <Header.Content>Posts</Header.Content>
                  </Header>
                  <Item.Group divided>
                    {posts.map((post, idx) => {
                      return (
                        <Item key={`post_${idx}`}>
                          <Item.Image
                            as="a"
                            size="tiny"
                            src={`${config.api}${post.coverImage}`}
                          />

                          <Item.Content>
                            <Item.Header>
                              <Link route="post" params={{ url: post.url }}>
                                <a>{post.title}</a>
                              </Link>
                            </Item.Header>
                            <Item.Description>
                              <p>{post.seed}</p>
                            </Item.Description>
                          </Item.Content>
                        </Item>
                      );
                    })}
                  </Item.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </Layout>
  );
}

Home.getInitialProps = async ({ req }) => {
  const posts = await getList({ isPrivate: false });
  const cookies = parseCookies(req);
  return {
    posts: posts ? posts : [],
    authToken: cookies.authToken ? JSON.parse(cookies.authToken) : null,
  };
};
