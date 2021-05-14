import React from 'react';
import Head from 'next/head';
import axios from 'axios';

import MainTemplate from 'components/template/mainTemplate/MainTemplate';
import PostLayout from 'container/post/PostLayout';
import { server } from 'config/config';
import { Post } from 'store/types/post.types';

type Props = {
	data: {
		posts: Post[];
	};
};

function DatabasePage({ data }: Props) {
	return (
		<>
			<Head>
				<title>Work-it (database)</title>
				<meta name="description" content="블로그 category database 페이지입니다." />
			</Head>
			<MainTemplate>
				<PostLayout posts={data.posts} />
			</MainTemplate>
		</>
	);
}

DatabasePage.getInitialProps = async () => {
	const response = await axios.get(`${server.host}/post/?limit=30&category=blog&kinds=database`);
	const posts = response.data.data;

	return {
		data: { ...posts },
	};
};

export default DatabasePage;
