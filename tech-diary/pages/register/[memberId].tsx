import React from 'react';
import Head from 'next/head';
import SignUpWithGithubContainer from 'container/account/SignUpWithGithubContainer';

function RegisterGithubPage() {
	return (
		<>
			<Head>
				<title>기본 정보 입력</title>
			</Head>
			<SignUpWithGithubContainer />
		</>
	);
}

export default RegisterGithubPage;
