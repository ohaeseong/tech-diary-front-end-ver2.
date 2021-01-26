import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PostCommentEditor from 'components/post/PostCommentEditor';
import useRequest from 'libs/hooks/useRequest';
import { requestGetComment, requestUpdateComment, requestUpdateReplyComment } from 'libs/repository';
import { getStorage } from 'libs/storage';
import { Comment } from 'store/types/post.types';

type Props = {
	toggleOpenEditor: () => void;
	setCommentList: (dispatch: Comment[]) => void;

	commentIdx: number;
	comment: string;
	parentIdx: number | string;
	isReply?: boolean;
};

function PostCommentUpdateContainer({
	comment,
	commentIdx,
	parentIdx,
	isReply,
	toggleOpenEditor,
	setCommentList,
}: Props) {
	const [commentText, setCommentText] = useState(comment);
	const [, , onUpdateComment] = useRequest(requestUpdateComment);
	const [, , onUpdateReplyComment] = useRequest(requestUpdateReplyComment);
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

		if (!isReply) {
			await onUpdateComment(req);
		} else {
			await onUpdateReplyComment(req);
		}

		const realoadCommentReq = {
			postId: parentIdx,
		};

		await reloadComment(realoadCommentReq);
	}, [commentIdx, commentText, isReply, onUpdateComment, onUpdateReplyComment, parentIdx, reloadComment]);

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
