import React from 'react';
import Head from 'next/head';
import SignUpContainer from 'container/account/SignUpContainer';

function SignUpPage() {
	return (
		<>
			<Head>
				<title>회원가입</title>
			</Head>
			<SignUpContainer />
		</>
	);
}

export default SignUpPage;
