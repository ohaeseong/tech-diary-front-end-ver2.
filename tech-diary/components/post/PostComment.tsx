import React from 'react';
import styled from '@emotion/styled';

const PostCommentTemplate = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 30rem;
	margin-left: 1rem;

	border: 1px solid black;

	margin-bottom: 5rem;
`;

const Header = styled.div`
	width: 100%;
	height: 5rem;

	border: 1px solid black;
`;

type Props = {
	commentList?: Comment[];
};

function PostComment({ commentList }: Props) {

	return (
		<PostCommentTemplate>
			<Header />
		</PostCommentTemplate>
	);
}

export default PostComment;
