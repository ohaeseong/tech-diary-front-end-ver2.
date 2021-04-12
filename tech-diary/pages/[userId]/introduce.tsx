import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserProfileContainer from 'container/user/UserInfoContainer';
import { server } from 'config/config';
import { NextPageContext } from 'next';
import { UserInfo } from 'store/types/auth.types';
import NotFoundPage from 'pages/404';
// import { Post } from 'store/types/post.types';

type Props = {
	userInfo: UserInfo;
};

function UserIntroducePage({ userInfo }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	if (!userInfo) {
		return <NotFoundPage />;
	}

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
	let userInfo;

	try {
		const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);

		userInfo = responseUserInfo.data.data;
	} catch (error) {
		// console.log(error);
	}

	return { userInfo };
};

export default UserIntroducePage;
