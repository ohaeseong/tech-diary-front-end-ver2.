import React from 'react';
import styled from '@emotion/styled';

const PostLikeOptionBlock = styled.div`
	position: sticky;
	width: 5rem;
	height: 10rem;
	margin-top: 12rem;
	margin-left: -5rem;
	top: 6rem;

	border: 1px solid black;
`;

function PostLikeOption() {
	return <PostLikeOptionBlock />;
}

export default PostLikeOption;
