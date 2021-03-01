import React from 'react';

import Head from 'next/head';
import PostDetailLayout from 'container/postDetail/PostDetailLayout';
import { NextPageContext } from 'next';
import axios from 'axios';
import { server } from 'config/config';
import { PostDetail } from 'store/types/post.types';

type Props = {
	post: PostDetail;
};

function DetailPage({ post }: Props) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="title" property="og:title" content={post.title} />
				<meta name="description" content="블로그 상세조회 페이지입니다." />
				<meta property="og::url" content={post.title} />
			</Head>
			<PostDetailLayout post={post} />
		</>
	);
}

DetailPage.getInitialProps = async (_: NextPageContext) => {
	const response = await axios.get(`${server.host}/post/detail/${_.query.id}`);
	const { post } = response.data.data;

	return { post };
};

export default DetailPage;
