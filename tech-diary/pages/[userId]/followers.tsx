import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { server } from 'config/config';
import { NextPageContext } from 'next';
import UserProfileContainer from 'container/user/UserInfoContainer';
import NotFoundPage from 'pages/404';
import { Member } from 'store/types/post.types';
import { UserInfo } from 'store/types/auth.types';
// import { Post } from 'store/types/post.types';

type Props = {
	followers: { memberList: Member[] };
	userInfo: UserInfo;
};

function FollowersPage({ followers, userInfo }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	if (!followers || !userInfo) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Head>
				<title>{userId} (팔로우) </title>
			</Head>
			<UserProfileContainer userInfo={userInfo} posts={[]} isSocial memberList={followers.memberList} />
		</>
	);
}

FollowersPage.getInitialProps = async ({ query }: NextPageContext) => {
	let followers;
	let userInfo;

	try {
		const responseFollowers = await axios.get(`${server.host}/social?memberId=${query.userId}&type=follower`);
		const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);

		followers = responseFollowers.data.data;
		userInfo = responseUserInfo.data.data;
	} catch (error) {
		// return null;
	}

	return { followers, userInfo };
};

export default FollowersPage;
