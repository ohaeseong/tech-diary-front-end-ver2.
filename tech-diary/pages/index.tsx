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
				<title>work-it</title>
				<meta
					name="description"
					content="당신의 지식을 공유해 주세요! 누구나 쉽게 쓰고 읽는, 개발자 블로그 플랫폼입니다! - (work-it)"
				/>
				<link rel="canonical" href="https://work-it.co.kr" />
				<meta property="fb:app_id" content="2111760498954706" />
				<meta property="og:image" content={`${server.client_url}/static/logo_template.png`} />
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
