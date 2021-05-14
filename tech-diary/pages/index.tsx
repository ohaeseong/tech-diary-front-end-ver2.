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

function IndexPage({ data }: Props) {
	return (
		<>
			<Head>
				<title>Work-It</title>
				<meta name="description" content="Work-It 당신의 지식을 공유해 주세요!" />
			</Head>
			<MainTemplate>
				<PostLayout posts={data.posts} />
			</MainTemplate>
		</>
	);
}

IndexPage.getInitialProps = async () => {
	const response = await axios.get(`${server.host}/post/?limit=30&category=blog`);
	const posts = response.data.data;

	return {
		data: { ...posts },
	};
};

export default IndexPage;
