import React from 'react';
import styled from '@emotion/styled';
import { Post } from 'store/types/post.types';
import { useRouter } from 'next/router';

import PostListHeader from 'components/post/PostListHeader';
import PostList from 'components/post/PostList';

const Template = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 80%;
	height: 100%;
	margin: 3rem auto;
`;

type Props = {
	posts: Array<Post>;
};

function PostTemplate({ posts }: Props) {
	const router = useRouter();
	const kinds = router.pathname.split('/');

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
		<Template>
			{posts.length > 0 ? <PostListHeader haedName={headName} /> : <></>}
			<PostList posts={posts} category="blog" kinds={kinds[2]} />
		</Template>
	);
}

export default PostTemplate;
