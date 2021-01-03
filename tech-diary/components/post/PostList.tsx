import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import post, { GET_POST_LIST_REQUEST } from 'store/modules/post';
import { Post } from 'store/types/post.types';
import PostItem from './PostItem';

const PostListTemplate = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(16rem, auto));
	grid-template-rows: repeat(auto-fit, 5);
	column-gap: 2rem;
	row-gap: 2rem;
`;

const NonePost = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 2rem;
`;

type Props = {
	posts: Post[];
};

function PostList({ posts }: Props) {

	return (
		<PostListTemplate>
			{posts.length !== 0 ? (
				posts.map((item) => {
					return <PostItem key={item.id} item={item} />;
				})
			) : (
				<NonePost>
					None post
					<br />
					Please write your story!
				</NonePost>
			)}
		</PostListTemplate>
	);
}

export default PostList;
