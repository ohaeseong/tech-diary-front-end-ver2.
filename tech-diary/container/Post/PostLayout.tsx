import React from 'react';
import styled from '@emotion/styled';

import PostList from 'components/post/PostList';
import { Post } from 'store/types/post.types';
import { useRouter } from 'next/router';

const PostLayoutTemplate = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 80%;
	height: 100%;
	margin: 3rem auto;
`;

const ContentsHeader = styled.div`
	width: 100%;
	height: 3rem;

	font-size: 2rem;
	line-height: 50px;
	padding-left: 20px;
	margin-bottom: 1rem;
`;

type Props = {
	posts: Array<Post>;
};

function PostLayout({ posts }: Props) {
	const router = useRouter();
	let headName = '';

	switch (router.pathname) {
		case '/blog/front-end':
			headName = 'Front-End';
			break;
		case '/blog/back-end':
			headName = 'Back-End';
			break;
		case '/blog/database':
			headName = 'Database';
			break;
		case '/blog/other':
			headName = 'Other';
			break;

		default:
			headName = 'All';
			break;
	}

	return (
		<PostLayoutTemplate>
			<ContentsHeader>{headName}</ContentsHeader>
			<PostList posts={posts} />
		</PostLayoutTemplate>
	);
}

export default PostLayout;
