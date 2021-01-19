import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PostCommentEdit from 'components/post/PostCommentEditor';
import useRequest from 'libs/hooks/useRequest';
import { requestGetComment, requestWriteComment } from 'libs/repository';
import { useDispatch, useSelector } from 'react-redux';
import { GET_POST_COMMENT_REQUEST } from 'store/modules/post.comment';
import { RootState } from 'store/modules';
import { getStorage } from 'libs/storage';

type Props = {
	postId: string;
	dispatchForUpdateState: any;
};

function PostCommentWriteContainer({ postId, dispatchForUpdateState }: Props) {
	const [comment, setComment] = useState('');
	const [, loading, onRequest] = useRequest(requestWriteComment);
	const dispatch = useDispatch();
	const { commentData } = useSelector((store: RootState) => store.postComment); // const [commentList, ,getComment]
	const handleCommentTextState = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length > 1000) {
			return;
		}

		setComment(event.target.value);
	}, []);

	const reloadComment = useCallback(() => {
		dispatch({
			type: GET_POST_COMMENT_REQUEST,
			payload: {
				postId,
			},
		});

		// dispatchForUpdateState({
		// 	name: 'commentList',
		// 	value: commentData,
		// });
	}, [dispatch, postId]);

	const applyComment = useCallback(async () => {
		const token = getStorage('tech-token');
		if (comment.length === 0) {
			return;
		}

		const req = {
			text: comment,
			postId,
			token,
		};

		await onRequest(req);
		setComment('');

		const reqGetComment = {
			postId,
		};

		// await requestGetComment(reqGetComment);

		// dispatchForUpdateState({
		// 	name: 'commentList',
		// 	value:
		// });
	}, [comment, postId, onRequest]);

	useEffect(() => {
		if (loading) {
			dispatch({
				type: GET_POST_COMMENT_REQUEST,
				payload: {
					postId,
				},
			});

			dispatchForUpdateState({
				name: 'commentList',
				value: commentData,
			});
		}
	}, [loading]);

	return (
		<PostCommentEdit
			commentText={comment}
			applyComment={applyComment}
			handleCommentTextState={handleCommentTextState}
		/>
	);
}

export default React.memo(PostCommentWriteContainer);
