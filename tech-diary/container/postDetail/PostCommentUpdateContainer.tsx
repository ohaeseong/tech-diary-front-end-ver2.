import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PostCommentEditor from 'components/post/PostCommentEditor';
import useRequest from 'libs/hooks/useRequest';
import { requestGetComment, requestUpdateComment } from 'libs/repository';
import { getStorage } from 'libs/storage';
import { Comment } from 'store/types/post.types';

type Props = {
	toggleOpenEditor: () => void;
	setCommentList: (dispatch: Comment[]) => void;

	commentIdx: number;
	comment: string;
	parentIdx: number | string;
};

function PostCommentUpdateContainer({ comment, commentIdx, parentIdx, toggleOpenEditor, setCommentList }: Props) {
	const [commentText, setCommentText] = useState(comment);
	const [, , onUpdateComment] = useRequest(requestUpdateComment);
	const [commentState, , reloadComment] = useRequest(requestGetComment);

	const handleCommentTextState = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length > 1000) {
			return;
		}

		setCommentText(event.target.value);
	}, []);

	const handleUpdateComment = useCallback(async () => {
		const token = getStorage('tech-token');
		if (commentText.length === 0) {
			return;
		}

		const req = {
			text: commentText,
			commentIdx,
			token,
		};

		await onUpdateComment(req);
		const realoadCommentReq = {
			postId: parentIdx,
		};

		await reloadComment(realoadCommentReq);
	}, [commentIdx, commentText, onUpdateComment, parentIdx, reloadComment]);

	useEffect(() => {
		if (commentState) {
			setCommentList(commentState.data.commentData);
			toggleOpenEditor();
		}
	}, [commentState, setCommentList, toggleOpenEditor]);

	return (
		<PostCommentEditor
			commentText={commentText}
			isUpdateMode
			toggleOpenEditor={toggleOpenEditor}
			onCommentFunction={handleUpdateComment}
			handleCommentTextState={handleCommentTextState}
		/>
	);
}

export default React.memo(PostCommentUpdateContainer);
