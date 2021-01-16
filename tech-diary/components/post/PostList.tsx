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
	category: string;
	kinds: string;
};

function PostList({ posts, category, kinds }: Props) {
	const [postList, setPostList] = useState(posts);
	const [isEarlyData, setIsEarlyData] = useState(true);
	const { postData, setLimit, limit } = usePost(category, kinds);

	const handlePostData = useCallback(() => {
		const { innerHeight } = window;
		const { scrollHeight } = document.body;

		const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

		if (scrollHeight - innerHeight - scrollTop < 100) {
			if (postData.length + 10 < limit) {
				return;
			}
			setLimit(limit + 10);

			setPostList(postData);
		}
	}, [limit, postData, setLimit]);

	useEffect(() => {
		window.addEventListener('scroll', handlePostData);

		return () => {
			window.removeEventListener('scroll', handlePostData);
		};
	}, [handlePostData]);

	useEffect(() => {
		if (postData.length !== 0) {
			setIsEarlyData(false);
		}
	}, [postData.length]);

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
