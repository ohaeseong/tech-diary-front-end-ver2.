import PostReplyComment from 'components/post/PostReplyComment';
import useRequest from 'libs/hooks/useRequest';
import { requestDeleteComment, requestDeleteReplyComment, requestGetReplyComment, requestWriteReplyComment } from 'libs/repository';
import React, { useCallback, useEffect, useState } from 'react';
import PostCommentWriteContainer from 'container/postDetail/PostCommentWriteContainer';
import styled from '@emotion/styled';
import { getStorage } from 'libs/storage';
import { SET_POST_COMMENT_COUNT } from 'store/modules/post.comment.count';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { Comment } from 'store/types/post.types';
import PostCommentItem from 'components/post/PostCommentItem';

const ReplyCommentWrap = styled.div`
	width: 100%;
`;

type Props = {
	commentIdx: number;
	item: Comment;
	setReplyComments: (dispatch: Comment[]) => void;
};

function PostReplyCommentContainer({ commentIdx, item, setReplyComments }: Props) {
	const [, , onDeleteComment] = useRequest(requestDeleteReplyComment);
	const [replyComments, , getReplyComment] = useRequest(requestGetReplyComment);

	const { commentCount } = useSelector((state: RootState) => state.postComment);
	const dispatch = useDispatch();

	const deleteComment = useCallback(async () => {
		const token = getStorage('tech-token');
		const req = {
			commentIdx: item.idx,
			token,
		};

		await onDeleteComment(req);

		const realoadCommentReq = {
			commentIdx,
		};
		await getReplyComment(realoadCommentReq);

		dispatch({
			type: SET_POST_COMMENT_COUNT,
			payload: {
				commentCount: commentCount - 1,
			},
		});
	}, [commentCount, commentIdx, dispatch, getReplyComment, item.idx, onDeleteComment]);

	useEffect(() => {
		const req = {
			commentIdx,
		};

		getReplyComment(req);
	}, [commentIdx, getReplyComment]);

	useEffect(() => {
		if (replyComments) {
			setReplyComments(replyComments.data.commentData);
		}
	}, [replyComments, setReplyComments]);

	return (
		<ReplyCommentWrap>
			{replyComments ? <PostCommentItem item={item} deleteComment={deleteComment} isReply /> : <></>}
		</ReplyCommentWrap>
	);
}

export default PostReplyCommentContainer;
