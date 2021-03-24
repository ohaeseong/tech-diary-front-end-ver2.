import React from 'react';
import Head from 'next/head';
import { useRouter, withRouter } from 'next/router';
import UserProfileContainer from 'container/user/UserInfoContainer';

function UserInfoPage() {
	const router = useRouter();
	const { userId } = router.query;

	return (
		<>
			<Head>
				<title>{userId}</title>
			</Head>
			<UserProfileContainer />
		</>
	);
}

export default withRouter(UserInfoPage);
