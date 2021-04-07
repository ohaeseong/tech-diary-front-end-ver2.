import React from 'react';
import Head from 'next/head';
import SignUpWithGithubContainer from 'container/account/SignUpWithGithubContainer';

function RegisterGithubPage() {
	return (
		<>
			<Head>
				<title>sign up to github</title>
			</Head>
			<SignUpWithGithubContainer />
		</>
	);
}

export default RegisterGithubPage;
