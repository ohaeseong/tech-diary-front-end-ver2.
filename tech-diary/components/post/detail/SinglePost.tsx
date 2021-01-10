import React from 'react';
import styled from '@emotion/styled';
import { PostDetail } from 'store/types/post.types';
import PostInfo from './PostInfo';
import PostContents from './PostContents';

const SinglePostTemplate = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	background-color: ${(props) => props.theme.white};

	margin-top: 5rem;
`;

const SinglePostContentsWrap = styled.div`
	display: flex;
	width: 50rem;
	height: 100vh;
	flex-direction: column;
	background-color: ${(props) => props.theme.white};
`;

const Title = styled.div`
	width: 100%;

	font-family: 'Spoqa Han Sans';
	font-size: 2.5rem;
	margin-top: 5rem;

	color: ${(props) => props.theme.black};
`;

type Props = {
	data: PostDetail;
};

function SinglePost({ data }: Props) {
	const { title, tagList } = data;

	return (
		<SinglePostTemplate>
			<SinglePostContentsWrap>
				<Title>{title}</Title>
				<PostInfo tagList={tagList} />
				<PostContents />
			</SinglePostContentsWrap>
		</SinglePostTemplate>
	);
}

export default SinglePost;
