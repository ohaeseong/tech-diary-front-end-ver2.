import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Post } from 'store/types/post.types';
import PostItem from 'components/post/PostItem';
import usePost from 'libs/hooks/usePost';
import { mediaQuery } from 'components/layout/responsive';

const PostListTemplate = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(auto-fit, minmax(16rem, auto));
	grid-template-rows: repeat(auto-fit, 1fr);
	column-gap: 2rem;
	row-gap: 2rem;
	place-items: center;
	${mediaQuery.over} {
		grid-template-columns: repeat(5, auto);
	}
`;

const NonePost = styled.div`
	width: 100%;
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	text-align: center;

	color: ${(props) => props.theme.black};
`;

type Props = {
	posts: Post[];
	isEarlyData: boolean;
	postList: Array<Post>;
};

function PostList({ posts, isEarlyData, postList }: Props) {
	return (
		<>
			<PostListTemplate>
				{isEarlyData && posts.length !== 0
					? posts.map((item) => {
							return <PostItem key={item.id} item={item} />;
					  })
					: postList.map((item) => {
							return <PostItem key={item.id} item={item} />;
					  })}
			</PostListTemplate>
			{posts.length === 0 ? (
				<NonePost>
					None Post <br /> Please write your story!{' '}
				</NonePost>
			) : (
				<></>
			)}
		</>
	);
}

export default PostList;
