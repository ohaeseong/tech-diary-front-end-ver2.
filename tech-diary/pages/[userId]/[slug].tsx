import React from 'react';

import Head from 'next/head';
import PostDetailLayout from 'container/postDetail/PostDetailLayout';
import { NextPageContext } from 'next';
import axios from 'axios';
import { server } from 'config/config';
import { PostDetail } from 'store/types/post.types';
import NotFoundPage from 'pages/404';

type Props = {
	post: PostDetail;
};

function DetailPage({ post }: Props) {
	if (!post) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="description" content="블로그 상세조회 페이지입니다." />
			</Head>
			<PostDetailLayout post={post} />
		</>
	);
}

DetailPage.getInitialProps = async ({ query }: NextPageContext) => {
	let post;

	try {
		const response = await axios.get(
			`${server.host}/post/url?memberId=${query.userId}&slug=${encodeURIComponent(query.slug as string)}`
		);
		post = response.data.data.post;
	} catch (error) {
		return { props: { post: null } };
	}

	return { post };
};

export default DetailPage;
