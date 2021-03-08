import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import UserProfileContainer from 'container/user/UserProfileContainer';

function UserInfoPage() {
	return (
		<>
			<Head />
			<UserProfileContainer />
		</>
	);
}

export default withRouter(UserInfoPage);
