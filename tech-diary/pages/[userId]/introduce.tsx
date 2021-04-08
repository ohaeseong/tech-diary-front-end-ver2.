import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserProfileContainer from 'container/user/UserInfoContainer';
import { server } from 'config/config';
import { NextPageContext } from 'next';
import { UserInfo } from 'store/types/auth.types';
import { Post } from 'store/types/post.types';

type Props = {
	userInfo: UserInfo;
};

function UserIntroducePage({ userInfo }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	return (
		<>
			<Head>
				<title>{userId} (소개) </title>
			</Head>
			<UserProfileContainer userInfo={userInfo} posts={[]} isIntro />
		</>
	);
}

UserIntroducePage.getInitialProps = async ({ query }: NextPageContext) => {
	const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
	const userInfo = responseUserInfo.data.data;

	return { userInfo };
};

export default UserIntroducePage;
