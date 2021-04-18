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

function FrontEndPage({ data }: Props) {
	return (
		<>
			<Head>
				<title>Blog front-end page</title>
				<meta name="description" content="블로그 category front-end 페이지입니다." />
			</Head>
			<MainTemplate>
				<PostLayout posts={data.posts} />
			</MainTemplate>
		</>
	);
}

FrontEndPage.getInitialProps = async () => {
	const response = await axios.get(`${server.host}/post/?limit=30&category=blog&kinds=front-end`);
	const posts = response.data.data;

	return {
		data: { ...posts },
	};
};

export default FrontEndPage;
