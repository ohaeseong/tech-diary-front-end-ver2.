import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PostCommentEdit from 'components/post/PostCommentEditor';
import useRequest from 'libs/hooks/useRequest';
import { requestGetComment, requestWriteComment } from 'libs/repository';
import { useDispatch } from 'react-redux';
import { getStorage } from 'libs/storage';
import { DROP_TOAST, SHOW_TOAST } from 'store/modules/toast';

type Props = {
	postId: string;
	dispatchForUpdateState: any;
};

function PostCommentWriteContainer({ postId, dispatchForUpdateState }: Props) {
	const [comment, setComment] = useState('');
	const [, , onWriteComment] = useRequest(requestWriteComment);
	const [commentState, , reloadComment] = useRequest(requestGetComment);

	const dispatch = useDispatch();

	const handleCommentTextState = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length > 1000) {
			return;
		}

		setComment(event.target.value);
	}, []);

	const applyComment = useCallback(async () => {
		const token = getStorage('tech-token');
		if (!token) {
			dispatch({
				type: SHOW_TOAST,
				payload: {
					text: '로그인 후 이용해 주세요!',
				},
			});

			setTimeout(() => {
				dispatch({
					type: DROP_TOAST,
				});
			}, 2000);

			return;
		}

		if (comment.length === 0) {
			return;
		}

		const req = {
			text: comment,
			postId,
			token,
		};

		await onWriteComment(req);
		setComment('');

		const realoadCommentReq = {
			postId,
		};

		await reloadComment(realoadCommentReq);
	}, [comment, postId, onWriteComment, reloadComment, dispatch]);

	useEffect(() => {
		if (commentState) {
			dispatchForUpdateState({
				name: 'commentList',
				value: commentState.data.commentData,
			});
		}
	}, [commentState, dispatchForUpdateState]);

	return (
		<PostCommentEdit
			commentText={comment}
			applyComment={applyComment}
			handleCommentTextState={handleCommentTextState}
		/>
	);
}

export default React.memo(PostCommentWriteContainer);
