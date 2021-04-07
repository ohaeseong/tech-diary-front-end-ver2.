import React from 'react';
import Head from 'next/head';
import axios from 'axios';

import MainTemplate from 'components/template/mainTemplate/MainTemplate';
import PostLayout from 'container/post/PostLayout';
import { server } from 'config/config';

type Props = {
	posts: Array<any>;
};

function MobilePage({ posts }: Props) {
	return (
		<>
			<Head>
				<title>Blog database page</title>
				<meta name="description" content="블로그 category mobile 페이지입니다." />
			</Head>
			<MainTemplate>
				<PostLayout posts={posts} />
			</MainTemplate>
		</>
	);
}

MobilePage.getInitialProps = async () => {
	const response = await axios.get(`${server.host}/post/?limit=30&category=blog&kinds=mobile`);
	const posts = response.data.data;

	return posts;
};

export default MobilePage;
