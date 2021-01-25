import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Comment } from 'store/types/post.types';
import PostReplyCommentContainer from 'container/postDetail/PostReplyCommentContainer';
import { requestGetReplyComment, requestWriteReplyComment } from 'libs/repository';
import PostCommentWriteContainer from 'container/postDetail/PostCommentWriteContainer';

const PostReplyCommentTemplate = styled.div`
	width: 100%;
`;

type Props = {
	replyCommentList: Comment[];
	postId: string;
	commentIdx: number;
};

function PostReplyComment({ replyCommentList, postId, commentIdx }: Props) {
	const [replyComments, setReplyComments] = useState(replyCommentList);

	return (
		<PostReplyCommentTemplate>
			{replyComments ? (
				replyComments.map((item: Comment) => {
					return (
						<PostReplyCommentContainer
							key={item.idx}
							item={item}
							postId={postId}
							commentIdx={commentIdx}
							setReplyComments={setReplyComments}
						/>
					);
				})
			) : (
				<></>
			)}
			<PostCommentWriteContainer
				postId={postId}
				setCommentList={setReplyComments}
				requestWriteComment={requestWriteReplyComment}
				requestGetComment={requestGetReplyComment}
				commentIdx={commentIdx}
			/>
		</PostReplyCommentTemplate>
	);
}

export default PostReplyComment;
