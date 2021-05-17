import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserProfileContainer from 'container/user/UserInfoContainer';
import { server } from 'config/config';
import { NextPageContext } from 'next';
import { UserInfo } from 'store/types/auth.types';
import { Post } from 'store/types/post.types';
import NotFoundPage from 'pages/404';

type Props = {
	userInfo: UserInfo;
	userPosts: Array<Post>;
};

function UserInfoPage({ userInfo, userPosts }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	if (!userInfo) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Head>
				<title>work-it ({userId})</title>
				<meta name="description" content={`${userInfo.memberId}님의 게시글을 확인해보세요!`} />
			</Head>
			<UserProfileContainer userInfo={userInfo} posts={userPosts} />
		</>
	);
}

UserInfoPage.getInitialProps = async ({ query }: NextPageContext) => {
	let userPosts;
	let userInfo;
	try {
		const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
		const responseUserPosts = await axios.get(`${server.host}/post/member?memberId=${query.userId}`);
		userInfo = responseUserInfo.data.data;
		userPosts = responseUserPosts.data.data.posts;
	} catch (error) {
		// return { props: { userInfo: null } };
	}

	return { userInfo, userPosts };
};

export default UserInfoPage;
