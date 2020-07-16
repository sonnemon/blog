const api =
  process.env.NODE_ENV == "production"
    ? "http://apiblog.sonnemon.com"
    : "http://localhost:4100";
const host =
  process.env.NODE_ENV == "production"
    ? "http://blog.sonnemon.com"
    : "http://localhost:3100";
export default {
  api,
  host,
};
