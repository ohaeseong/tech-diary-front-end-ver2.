import React from 'react';
import Head from 'next/head';
import SignUpWithGithubContainer from 'container/account/SignUpWithGithubContainer';

function RegisterGithubPage() {
	return (
		<>
			<Head>
				<title>기본 정보 입력</title>
				<meta name="description" content="회원 정보 저장 페이지" />
				<meta name="robots" content="noindex" />
			</Head>
			<SignUpWithGithubContainer />
		</>
	);
}

export default RegisterGithubPage;
