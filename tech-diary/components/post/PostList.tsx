import React from 'react';
import styled from '@emotion/styled';
import { Post } from 'store/types/post.types';
import PostItem from 'components/post/PostItem';
import { mediaQuery } from 'components/layout/responsive';

const PostListTemplate = styled.div`
	display: flex;
	flex-wrap: wrap;
	& > * {
		margin: 1rem;
	}
	display: flex;
	margin: -1rem;
	flex-wrap: wrap;
	${mediaQuery(767)} {
		margin: 0;
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
	postList: Array<Post>;
};

function PostList({ postList }: Props) {
	return (
		<>
			<PostListTemplate>
				{postList.map((item) => {
					return <PostItem key={item.id} item={item} />;
				})}
			</PostListTemplate>
			{postList.length === 0 ? (
				<NonePost>
					None Post <br /> Please write your story!
				</NonePost>
			) : (
				<></>
			)}
		</>
	);
}

export default PostList;
