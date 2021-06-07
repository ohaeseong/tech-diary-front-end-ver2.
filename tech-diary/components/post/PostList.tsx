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
	font-size: 1.7rem;
	text-align: center;

	color: ${(props) => props.theme.gray_6};

	${mediaQuery(768)} {
		font-size: 1.2rem;
	}
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
					게시글이 없습니다. <br /> 게시글을 작성해보세요!
				</NonePost>
			) : (
				<></>
			)}
		</>
	);
}

export default PostList;
