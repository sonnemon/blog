import axios from "axios";
import config from "../config";
export async function loginRequest(variables) {
  console.log(config);
  const gql = `
    query LoginQuery($input:loginInput!){
      login(input:$input){
        token
      }
    }
	`;
  try {
    const { data } = await axios.post(
      `${config.api}/graphql`,
      {
        query: gql,
        variables,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    if (data.data.login == null) {
      return { error: true, code: data.errors[0].message };
    }
    return data.data.login;
  } catch (e) {
    console.log(Object.keys(e));
    return { error: true, code: "Ga" };
  }
}

export async function registerUser(variables, authToken) {
  const gql = `
		mutation AuthRegisterMutation(
			$input:registerInput!
		){
			register(input:$input){
				code
			}
		}
  `;
  console.log(config);
  try {
    const { data } = await axios.post(
      `${config.api}/graphql`,
      {
        query: gql,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data.data.register == null) {
      return { error: true, code: data.errors[0].message };
    }
    return { error: false, ...data.data.register };
  } catch (e) {
    return { error: true, code: null };
  }
}
