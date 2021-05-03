import React from 'react';
import styled from '@emotion/styled';
import InventoryPostList from 'components/post/InventoryPostList';
import InventoryPostItem from 'components/post/InventoryPostItem';
import { Post } from 'store/types/post.types';

const SearchPageTemplate = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	margin-top: 5rem;
	background-color: ${(props) => props.theme.white};

	& > * {
		margin-top: 3rem;
	}
`;

const PostCount = styled.div`
	width: 55%;

	& > * {
		font-family: 'Spoqa Han Sans Thin';
		color: ${(props) => props.theme.gray_4};
	}
`;

type Props = {
	posts: Array<Post>;
};

function PostTagSearch({ posts }: Props) {
	return (
		<SearchPageTemplate>
			{posts.length !== 0 ? (
				<PostCount>
					<div> 총 {posts.length}개의 포스트</div>
				</PostCount>
			) : (
				<></>
			)}
			<InventoryPostList>
				{posts.map((item: any) => {
					return <InventoryPostItem key={item.postId} item={item.post} />;
				})}
			</InventoryPostList>
		</SearchPageTemplate>
	);
}

export default PostTagSearch;
