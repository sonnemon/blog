module.exports = {
  distDir: "build",
  env: {
    API:
      process.env.API != "" ? process.env.API : "http://apiblog.sonnemon.com",
    SERVER_API_GQL:
      process.env.SERVER_API_GQL != ""
        ? process.env.SERVER_API_GQL
        : "http://apiblog.sonnemon.com/graphql",
    BROWSER_API_GQL:
      process.env.BROWSER_API_GQL != ""
        ? process.env.BROWSER_API_GQL
        : "http://apiblog.sonnemon.com/graphql",
    HOST:
      process.env.HOST != "" ? process.env.HOST : "http://blog.sonnemon.com",
  },
};
