import React from 'react';
import axios from 'axios';
import Head from 'next/head';

import PostEditorContainer from 'container/postWrite/PostEditorContainer';
import { server } from 'config/config';
import { NextPageContext } from 'next';
import { PostDetail } from 'store/types/post.types';

type Props = {
	post: PostDetail;
};

function BlogWriteEditPage({ post }: Props) {
	console.log(post);

	return (
		<>
			<Head>
				<title>(작성중) Blog write page</title>
				<meta name="description" content="블로그 작성 페이지 입니다." />
			</Head>
			<PostEditorContainer />
		</>
	);
}

BlogWriteEditPage.getInitialProps = async (_: NextPageContext) => {
	const response = await axios.get(`${server.host}/post/detail/${_.query.id}`);
	const { post } = response.data.data;

	return { post };
};

export default BlogWriteEditPage;
