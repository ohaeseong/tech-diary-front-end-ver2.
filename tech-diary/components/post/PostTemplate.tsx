import React from 'react';
import styled from '@emotion/styled';
import { Post } from 'store/types/post.types';

import PostList from 'components/post/PostList';

const Template = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 80%;
	height: 100%;
	margin: 3rem auto;
`;

const Header = styled.div`
	height: 3rem;
	font-size: 2rem;
	line-height: 50px;
	margin: 1rem 1rem;

	color: ${(props) => props.theme.black};
`;

type Props = {
	postList: Array<Post>;
	posts: Array<Post>;
	headName: string;
	isEarlyData: boolean;
};

function PostTemplate({ posts, isEarlyData, postList, headName }: Props) {
	return (
		<Template>
			{posts.length > 0 ? <Header>{headName}</Header> : <></>}
			<PostList posts={posts} isEarlyData={isEarlyData} postList={postList} />
		</Template>
	);
}

export default PostTemplate;
