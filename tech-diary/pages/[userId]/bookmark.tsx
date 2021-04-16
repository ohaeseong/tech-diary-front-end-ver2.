import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserProfileContainer from 'container/user/UserInfoContainer';
import { server } from 'config/config';
import { NextPageContext } from 'next';
import { UserInfo } from 'store/types/auth.types';
import NotFoundPage from 'pages/404';
import { Post } from 'store/types/post.types';

type Props = {
	userInfo: UserInfo;
	posts: Array<Post>;
};

function UserBookmarkPostPage({ userInfo, posts }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	if (!posts || !userInfo) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Head>
				<title>{userId} (북마크)</title>
			</Head>
			<UserProfileContainer userInfo={userInfo} posts={posts} />
		</>
	);
}

UserBookmarkPostPage.getInitialProps = async ({ query }: NextPageContext) => {
	let userInfo;
	let posts;

	try {
		const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
		const responseBookMarkPosts = await axios.get(`${server.host}/post/bookmark?memberId=${query.userId}`);

		userInfo = responseUserInfo.data.data;
		posts = responseBookMarkPosts.data.data.posts;
	} catch (error) {
		// return { props: {userInfo, :nullposts: null } };
	}

	return { userInfo, posts };
};

export default UserBookmarkPostPage;
