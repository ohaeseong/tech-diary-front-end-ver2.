import React from 'react';
import GitHubCallbackComponent from 'components/account/login/GithubLoginCallback';
import Head from 'next/head';

function GitHubLoginCallback() {
	return (
		<>
			<Head>
				<title>github-login-callback</title>
			</Head>
			<GitHubCallbackComponent />
		</>
	);
}

export default GitHubLoginCallback;
