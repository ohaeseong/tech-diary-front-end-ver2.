import React, { ChangeEvent, useCallback, useState } from 'react';
import PostCommentEdit from 'components/post/PostCommentEditor';
import useRequest from 'libs/hooks/useRequest';
import { requestGetComment, requestWriteComment } from 'libs/repository';

type Props = {
	postId: string;
};

function PostCommentWriteContainer({ postId }: Props) {
	const [comment, setComment] = useState('');
	const [, , onRequest] = useRequest(requestWriteComment);

	const handleCommentTextState = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length > 1000) {
			return;
		}

		setComment(event.target.value);
	}, []);

	const applyComment = useCallback(async () => {
		if (comment.length === 0) {
			return;
		}

		const req = {
			text: comment,
			postId,
		};

		await onRequest(req);
		setComment('');
	}, [comment, postId, onRequest]);

	return (
		<PostCommentEdit
			commentText={comment}
			applyComment={applyComment}
			handleCommentTextState={handleCommentTextState}
		/>
	);
}

export default React.memo(PostCommentWriteContainer);
