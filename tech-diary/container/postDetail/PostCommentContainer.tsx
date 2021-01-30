import React, { useCallback, useEffect } from 'react';
import PostComment from 'components/post/PostCommentItem';
import { Comment } from 'store/types/post.types';
import useRequest from 'libs/hooks/useRequest';
import { requestDeleteComment, requestGetComment } from 'libs/repository';
import { getStorage } from 'libs/storage';
import { useDispatch, useSelector } from 'react-redux';
import { SET_POST_COMMENT_COUNT } from 'store/modules/post.comment.count';
import { RootState } from 'store/modules';

type Props = {
	setCommentList: (dispaach: Comment[]) => void;
	item: Comment;
	isReply?: boolean;
};

function PostCommentContainer({ item, isReply, setCommentList }: Props) {
	const [, , onDeleteComment] = useRequest(requestDeleteComment);
	const [commentState, , reloadComment] = useRequest(requestGetComment);
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
			postId: item.postId,
		};
		await reloadComment(realoadCommentReq);

		if (item.replyComments) {
			dispatch({
				type: SET_POST_COMMENT_COUNT,
				payload: {
					commentCount: commentCount - (item.replyComments.length + 1),
				},
			});

			return;
		}
		dispatch({
			type: SET_POST_COMMENT_COUNT,
			payload: {
				commentCount: commentCount - 1,
			},
		});
	}, [commentCount, dispatch, item.idx, item.postId, item.replyComments, onDeleteComment, reloadComment]);

	useEffect(() => {
		if (commentState) {
			setCommentList(commentState.data.commentData);
		}
	}, [commentState, setCommentList]);

	return <PostComment item={item} isReply={isReply} deleteComment={deleteComment} setCommentList={setCommentList} />;
}

export default PostCommentContainer;
