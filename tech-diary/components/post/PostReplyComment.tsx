import React from 'react';
import styled from '@emotion/styled';
import { Comment } from 'store/types/post.types';
import PostCommentItem from 'components/post/PostCommentItem';

const PostReplyCommentTemplate = styled.div`
	width: 100%;
`;

type Props = {
	replyCommentList: Comment[];
};

function PostReplyComment({ replyCommentList }: Props) {
	return (
		<PostReplyCommentTemplate>
			{replyCommentList.map((item: Comment) => {
				return <PostCommentItem key={item.idx} item={item} isReply />;
			})}
		</PostReplyCommentTemplate>
	);
}

export default PostReplyComment;
