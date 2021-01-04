import React from 'react';
import styled from '@emotion/styled';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';

import post, { GET_POST_LIST_REQUEST } from 'store/modules/post';
import { Post } from 'store/types/post.types';
import PostItem from 'components/post/PostItem';
import { color } from 'styles/color';

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
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 2rem;
`;

const SkeletonWrap = styled.div`
	width: 270px;
	display: flex;
	flex-direction: column;
	padding: 0.5rem;
	background-color: ${color.gray_2};
	border-radius: 5px;

	& > * {
		margin-bottom: 0.5rem;
	}
`;

const SkeletonTemplate = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(16rem, auto));
	grid-template-rows: repeat(auto-fit, 5);
	column-gap: 2rem;
	row-gap: 2rem;
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
				<SkeletonTheme color={color.gray_0} highlightColor={color.gray_1}>
					<SkeletonTemplate>
						<SkeletonWrap>
							<Skeleton width={250} height={70} />
							<Skeleton width={200} height={30} />
							<Skeleton width={220} height={70} />
							<Skeleton width={250} height={30} />
						</SkeletonWrap>
					</SkeletonTemplate>
				</SkeletonTheme>
			)}
		</PostListTemplate>
	);
}

export default PostList;
