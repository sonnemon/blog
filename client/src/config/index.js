const endpoint = process.browser
  ? process.env.BROWSER_API_GQL
  : process.env.SERVER_API_GQL;
console.log(
  process.browser,
  process.env.SERVER_API_GQL,
  process.env.BROWSER_API_GQL,
  process.env.NODE_ENV
);
export default {
  endpoint:
    process.env.NODE_ENV == "production"
      ? "http://apiblog.sonnemon.com/graphql"
      : endpoint,
  api:
    process.env.NODE_ENV == "production"
      ? "http://apiblog.sonnemon.com"
      : process.env.API,
};
