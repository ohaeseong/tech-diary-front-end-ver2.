import React from 'react';
import styled from '@emotion/styled';
import { Tag } from 'store/types/post.types';

const PostInfoWrap = styled.div`
	width: 100%;
	height: 4rem;
	border: 1px solid black;
`;

type Props = {
	tagList: Tag[];
};

function PostInfo({ tagList }: Props) {
	console.log(tagList);
	
	return <PostInfoWrap />;
}

export default PostInfo;
