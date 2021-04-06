import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserProfileContainer from 'container/user/UserInfoContainer';
import { server } from 'config/config';
import { NextPageContext } from 'next';
import { UserInfo } from 'store/types/auth.types';

type Props = {
	userInfo: UserInfo;
};

function UserInfoPage({ userInfo }: Props) {
	const router = useRouter();
	const { userId } = router.query;

	return (
		<>
			<Head>
				<title>{userId}</title>
			</Head>
			<UserProfileContainer userInfo={userInfo} />
		</>
	);
}

UserInfoPage.getInitialProps = async ({ query }: NextPageContext) => {
	const response = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
	const userInfo = response.data.data;

	return { userInfo };
};

export default UserInfoPage;
