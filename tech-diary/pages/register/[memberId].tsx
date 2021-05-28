import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import SignUpWithSocialContainer from 'container/account/SignUpWithSocialContainer';
import { Context } from 'node:vm';
import { server } from 'config/config';
import { SocialProfile } from 'store/types/auth.types';

type Props = {
	profile: SocialProfile;
};

function RegisterGithubPage({ profile }: Props) {
	return (
		<>
			<Head>
				<title>기본 정보 입력</title>
				<meta name="description" content="회원 정보 저장 페이지" />
				<meta name="robots" content="noindex" />
			</Head>
			<SignUpWithSocialContainer userInfo={profile} />
		</>
	);
}

RegisterGithubPage.getInitialProps = async (context: Context) => {
	const { req } = context;

	const registerToken = req?.cookies.register_token;
	let response;

	if (registerToken) {
		response = await axios.get(`${server.host}/auth/social-profile`, {
			headers: {
				token: registerToken,
			},
		});

		const { data } = response.data;

		return { profile: data };
	}

	return { profile: null };
};

export default RegisterGithubPage;
