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
	savePosts: Array<Post>;
};

function UserSavePostPage({ userInfo, savePosts }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	return (
		<>
			<Head>
				<title>{userId} (임시저장 글)</title>
			</Head>
			<UserProfileContainer userInfo={userInfo} posts={savePosts} />
		</>
	);
}

UserSavePostPage.getInitialProps = async ({ query }: NextPageContext) => {
	const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
	const responseSavePosts = await axios.get(`${server.host}/post/state?memberId=${query.userId}&state=${0}`);
	const userInfo = responseUserInfo.data.data;
	const savePosts = responseSavePosts.data.data.posts;

	return { userInfo, savePosts };
};

export default UserSavePostPage;
