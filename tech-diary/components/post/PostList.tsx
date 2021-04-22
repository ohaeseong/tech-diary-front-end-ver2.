import React from 'react';
import styled from '@emotion/styled';
import { Post } from 'store/types/post.types';
import PostItem from 'components/post/PostItem';
import { mediaQuery } from 'components/layout/responsive';

const PostListTemplate = styled.div`
	display: flex;
	/* width: 100%; */
	flex-wrap: wrap;
	/* grid-template-columns: repeat(auto-fit, minmax(16rem, auto));
	grid-template-rows: repeat(auto-fit, 1fr); */
	/* column-gap: 2rem;
	row-gap: 2rem; */
	margin: -1rem;
	/* border: 1px solid black; */
	& > * {
		margin: 1rem;
	}

	width: 1760px;
	margin-left: auto;
	margin-right: auto;
	${mediaQuery(1919)} {
		width: 1408px;
	}
	${mediaQuery(1440)} {
		width: 1224px;
	}
	${mediaQuery(1340)} {
		width: 1024px;
	}
	${mediaQuery(1056)} {
		width: calc(100% - 3rem);
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
