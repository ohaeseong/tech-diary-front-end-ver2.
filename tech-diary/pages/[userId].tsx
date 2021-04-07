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
	userPosts: Array<Post>;
};

function UserInfoPage({ userInfo, userPosts }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	return (
		<>
			<Head>
				<title>{userId}</title>
			</Head>
			<UserProfileContainer userInfo={userInfo} userPosts={userPosts} />
		</>
	);
}

UserInfoPage.getInitialProps = async ({ query }: NextPageContext) => {
	const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
	const responseUserPosts = await axios.get(`${server.host}/post/member?memberId=${query.userId}`);
	const userInfo = responseUserInfo.data.data;
	const userPosts = responseUserPosts.data.data.posts;


	return { userInfo, userPosts };
};

export default UserInfoPage;
