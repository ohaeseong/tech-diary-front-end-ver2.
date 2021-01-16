import React from 'react';
import styled from '@emotion/styled';
import { Comment } from 'store/types/post.types';

const PostCommentItemWrap = styled.div`
	width: 100%;
	height: 6rem;

	border-bottom: 1px solid black;
`;

type Props = {
	item: Comment;
};

function PostCommentItem({ item }: Props) {
	console.log(item);

	return <PostCommentItemWrap></PostCommentItemWrap>;
}

export default PostCommentItem;
