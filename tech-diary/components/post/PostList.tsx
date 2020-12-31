import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import post, { GET_POST_LIST_REQUEST } from 'store/modules/post';
import { Post } from 'store/types/post.types';
import PostItem from './PostItem';

const PostListTemplate = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(18rem, auto));
	grid-template-rows: repeat(auto-fit, 1fr);
	column-gap: 2rem;
	row-gap: 2rem;
`;

type Props = {
	posts: Post[];
};

function PostList({ posts }: Props) {

	return (
		<PostListTemplate>
			{posts.map((item) => {
				return <PostItem key={item.id} item={item} />;
			})}
		</PostListTemplate>
	);
}

export default PostList;
