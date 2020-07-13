const endpoint = process.browser ? process.env.BROWSER_API_GQL : process.env.SERVER_API_GQL;
console.log(process.browser, process.env.SERVER_API_GQL, process.env.BROWSER_API_GQL);
export default {
	endpoint
};
