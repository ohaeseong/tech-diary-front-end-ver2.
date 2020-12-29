import React from 'react';
import LoginLayout from 'container/account/LoginLayout';
import Head from 'next/head';

function Login() {
	return (
		<>
			<Head>
				<title>login</title>
			</Head>
			<LoginLayout />
		</>
	);
}

export default Login;
