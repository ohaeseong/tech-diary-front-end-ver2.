import React from 'react';
import styled from '@emotion/styled';
import { Post } from 'store/types/post.types';
import PostItem from 'components/post/PostItem';

const PostListTemplate = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	/* grid-template-columns: repeat(auto-fit, minmax(16rem, auto));
	grid-template-rows: repeat(auto-fit, 1fr); */
	/* column-gap: 2rem;
	row-gap: 2rem; */
	place-items: center;
	/* border: 1px solid black; */
	& > * {
		margin: 1rem;
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
