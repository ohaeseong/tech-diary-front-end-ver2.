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
	posts: Array<Post>;
};

function UserBookmarkPostPage({ userInfo, posts }: Props) {
	const router = useRouter();
	const { userId } = router.query;

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
	const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
	const responseBookMarkPosts = await axios.get(`${server.host}/post/bookmark?memberId=${query.userId}`);
	const userInfo = responseUserInfo.data.data;
	const { posts } = responseBookMarkPosts.data.data;

	return { userInfo, posts };
};

export default UserBookmarkPostPage;
