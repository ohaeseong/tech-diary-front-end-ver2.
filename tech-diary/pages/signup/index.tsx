import React from 'react';
import Head from 'next/head';
import SignUpWithGithubContainer from 'container/account/SignUpWithGithubContainer';

function SignUpPage() {
	return (
		<>
			<Head>
				<title>회원가입</title>
			</Head>
			<SignUpWithGithubContainer />
		</>
	);
}

export default SignUpPage;
