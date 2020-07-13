import React, { Fragment } from 'react';
import Head from 'next/head';
import ReactNotification from 'react-notifications-component';
import Navbar from '../components/Navbar';

export default function index({ children, authToken }) {
	return (
		<Fragment>
			<Head>
				<title>Blog-Sonnemon</title>
				<link
					rel="stylesheet"
					href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
				/>
				<link rel="shortcut icon" href="/public/favicon.ico" />
			</Head>
			<div>
				<ReactNotification />
				<Navbar authToken={authToken} />

				{children}
			</div>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
						Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</Fragment>
	);
}
