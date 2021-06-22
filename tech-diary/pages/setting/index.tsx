// import Head from 'next/head';
// import React from 'react';
// import PostSearchContainer from 'container/search/PostSearchContainer';
// import { server } from 'config/config';
// import axios from 'axios';
// import { NextPageContext } from 'next';

// function SettingPage() {
// 	return (
// 		<>
// 			<Head>
// 				<title>{userId} (설정 페이지)</title>
// 				<meta name="description" content="북마크 게시글 페이지" />
// 				<meta name="robots" content="noindex" />
// 			</Head>
// 			<PostSearchContainer />
// 		</>
// 	);
// }

// SettingPage.getInitialProps = async ({ query }: NextPageContext) => {
// 	let userInfo;
// 	let posts;

// 	try {
// 		const responseUserInfo = await axios.get(`${server.host}/auth/user-info?memberId=${query.userId}`);
// 		const responseBookMarkPosts = await axios.get(`${server.host}/post/bookmark?memberId=${query.userId}`);

// 		userInfo = responseUserInfo.data.data;
// 		posts = responseBookMarkPosts.data.data.posts;
// 	} catch (error) {
// 		// return { props: {userInfo, :nullposts: null } };
// 	}

// 	return { userInfo, posts };
// };

// export default SettingPage;
