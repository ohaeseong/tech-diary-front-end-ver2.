import React from 'react';
import LoginLayout from 'container/account/LoginLayout';
import Head from 'next/head';

function Login() {
	return (
		<>
			<Head>
				<title>Work-It (로그인)</title>
				<meta name="description" content="Work-It 로그인 페이지" />
			</Head>
			<LoginLayout />
		</>
	);
}

export default Login;
