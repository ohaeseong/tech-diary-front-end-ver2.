import Head from 'next/head';
import React from 'react';
import { server } from 'config/config';
import axios from 'axios';
import { Post } from 'store/types/post.types';
import PostTagSearchContainer from 'container/search/PostTagSearchContainer';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

interface TagPost extends Post {
	tagName: string;
}

type Props = {
	posts: TagPost[];
};

function SearchTagPage({ posts }: Props) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>{router.query.tag}</title>
				<meta name="description" content="Work-It 태그 검색 페이지" />
			</Head>
			<PostTagSearchContainer posts={posts} />
		</>
	);
}

SearchTagPage.getInitialProps = async ({ query }: NextPageContext) => {
	let posts;

	try {
		const response = await axios.get(`${server.host}/post/tag?tag=${encodeURIComponent(query.tag as string)}`);
		posts = response.data.data.posts;
	} catch (error) {
		return { posts: null };
	}

	return { posts };
};

export default SearchTagPage;
