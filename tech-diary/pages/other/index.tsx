import React from 'react';
import Head from 'next/head';
import axios from 'axios';

import MainTemplate from 'components/template/mainTemplate/MainTemplate';
import PostLayout from 'container/post/PostLayout';
import { server } from 'config/config';
import { GetStaticProps } from 'next';
import { Post } from 'store/types/post.types';

type Props = {
	data: {
		posts: Post[];
	};
};
function OtherPage({ data }: Props) {
	return (
		<>
			<Head>
				<title>Blog other page</title>
				<meta name="description" content="블로그 category other 페이지입니다." />
			</Head>
			<MainTemplate>
				<PostLayout posts={data.posts} />
			</MainTemplate>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const response = await axios.get(`${server.host}/post/?limit=30&category=blog$kinds=etc`);
	const posts = response.data.data;

	return {
		props: {
			data: { ...posts },
		},
	};
};

export default OtherPage;
