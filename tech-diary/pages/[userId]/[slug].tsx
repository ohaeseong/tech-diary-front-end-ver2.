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

	const url = `${server.client_url}${post.url}`;

	return (
		<>
			<Head>
				<title>{post.title}</title>
				{post.intro ? <meta name="description" content={post.intro} /> : <></>}
				<link rel="canonical" href={url} />
				<meta property="og:url" content={url} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={post.intro} />
				{post.thumbnailAddress && <meta property="og:image" content={post.thumbnailAddress} />}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={post.title} />
				<meta name="twitter:description" content={post.intro} />
				{post.thumbnailAddress && <meta name="twitter:image" content={post.thumbnailAddress} />}
				{post.thumbnailAddress && <meta name="og:image" content={post.thumbnailAddress} />}
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
