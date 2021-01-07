import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { NextPageContext } from 'next';

import { MainTemplate } from 'components/template/MainTemplate';
import PostLayout from 'container/Post/PostLayout';
import { server } from 'config/config';

type Props = {
	posts: Array<any>;
};

function FrontEndPage({ posts }: Props) {
	return (
		<>
			<Head>
				<title>Main page</title>
			</Head>
			<MainTemplate>
				<PostLayout posts={posts} />
			</MainTemplate>
		</>
	);
}

FrontEndPage.getInitialProps = async (_: NextPageContext) => {
	const response = await axios.get(`${server.host}/post/?limit=30&category=blog&kinds=front-end`);
	const posts = response.data.data;

	return posts;
};

export default FrontEndPage;
