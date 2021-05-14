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

function BackEndPage({ data }: Props) {
	return (
		<>
			<Head>
				<title>Work-it (back-end)</title>
				<meta name="description" content="블로그 category back-end 페이지입니다." />
			</Head>
			<MainTemplate>
				<PostLayout posts={data.posts} />
			</MainTemplate>
		</>
	);
}

BackEndPage.getInitialProps = async () => {
	const response = await axios.get(`${server.host}/post/?limit=30&category=blog&kinds=back-end`);
	const posts = response.data.data;

	return {
		data: { ...posts },
	};
};

export default BackEndPage;
