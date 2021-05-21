import React from 'react';
import Head from 'next/head';
import SignUpContainer from 'container/account/SignUpWithSocialContainer';

function SignUpPage() {
	return (
		<>
			<Head>
				<title>회원가입</title>
				<meta name="description" content="회원가입 페이지 입니다." />
				<meta name="robots" content="noindex" />
			</Head>
			<SignUpContainer />
		</>
	);
}

export default SignUpPage;
