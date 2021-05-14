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
	savePosts: Array<Post>;
};

function UserSavePostPage({ userInfo, savePosts }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	if (!userInfo || !savePosts) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Head>
				<title>{userId} (임시저장 글)</title>
				<meta name="description" content="사용자 임시저장 글 페이지" />
				<meta name="robots" content="noindex" />
			</Head>
			<UserProfileContainer userInfo={userInfo} posts={savePosts} />
		</>
	);
}

UserSavePostPage.getInitialProps = async ({ query }: NextPageContext) => {
	let userInfo;
	let savePosts;

	try {
		const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
		const responseSavePosts = await axios.get(`${server.host}/post/state?memberId=${query.userId}&state=${0}`);

		userInfo = responseUserInfo.data.data;
		savePosts = responseSavePosts.data.data.posts;
	} catch (error) {
		// return null;
	}

	return { userInfo, savePosts };
};

export default UserSavePostPage;
