import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { server } from 'config/config';
import { NextPageContext } from 'next';
import UserProfileContainer from 'container/user/UserInfoContainer';
import NotFoundPage from 'pages/404';
import { FollowInfo } from 'store/types/post.types';
import { UserInfo } from 'store/types/auth.types';
// import { Post } from 'store/types/post.types';

type Props = {
	followings: { memberList: FollowInfo[] };
	userInfo: UserInfo;
};

function FollowingsPage({ followings, userInfo }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	if (!followings || !userInfo) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Head>
				<title>{userId} (팔로잉) </title>
			</Head>
			<UserProfileContainer
				userInfo={userInfo}
				posts={[]}
				isSocial
				memberList={followings.memberList}
				isFollowers={false}
			/>
		</>
	);
}

FollowingsPage.getInitialProps = async ({ query }: NextPageContext) => {
	let followings;
	let userInfo;

	try {
		const responseFollowers = await axios.get(`${server.host}/social?memberId=${query.userId}&type=following`);
		const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);

		followings = responseFollowers.data.data;
		userInfo = responseUserInfo.data.data;
	} catch (error) {
		// return null;
	}

	return { followings, userInfo };
};

export default FollowingsPage;
