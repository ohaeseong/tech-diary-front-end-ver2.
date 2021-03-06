import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserProfileContainer from 'container/user/UserInfoContainer';
import { server } from 'config/config';
import { NextPageContext } from 'next';
import NotFoundPage from 'pages/404';
import { UserInfo } from 'store/types/auth.types';
import { Post } from 'store/types/post.types';

type Props = {
	userInfo: UserInfo;
	posts: Array<Post>;
};

function UserPrivatePostPage({ userInfo, posts }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	if (!userInfo || !posts) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Head>
				<title>{userId} (비공개 게시글)</title>
				<meta name="description" content="사용자 비공개 게시글 페이지" />
				<meta name="robots" content="noindex" />
			</Head>
			<UserProfileContainer userInfo={userInfo} posts={posts} />
		</>
	);
}

UserPrivatePostPage.getInitialProps = async ({ query }: NextPageContext) => {
	let userInfo;
	let posts;

	try {
		const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
		const responsePrivatePosts = await axios.get(`${server.host}/post/state?memberId=${query.userId}&state=${2}`);

		userInfo = responseUserInfo.data.data;
		posts = responsePrivatePosts.data.data.posts;
	} catch (error) {
		// return null;
	}

	return { userInfo, posts };
};

export default UserPrivatePostPage;
