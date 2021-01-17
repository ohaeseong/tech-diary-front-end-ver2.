import React, { ChangeEvent, useCallback, useState } from 'react';
import PostCommentEdit from 'components/post/PostCommentEditor';
import useRequest from 'libs/hooks/useRequest';
import { requestWriteComment } from 'libs/repository';

// import styled from '@'

type Props = {
	postId: string;
}

function PostCommentWriteContainer({ postId }: Props) {
	const [comment, setComment] = useState('');
	const [data, loading, onRequest] = useRequest(requestWriteComment);

	const handleCommentTextState = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length > 1000) {
			return;
		}

		setComment(event.target.value);
	}, []);

	const applyComment = async () => {
		if (comment.length === 0) {
			return;
		}

		const req = {
			text: comment,
			postId,
		};

		onRequest(req);
	};

	return (
		<PostCommentEdit
			commentText={comment}
			applyComment={applyComment}
			handleCommentTextState={handleCommentTextState}
		/>
	);
}

export default React.memo(PostCommentWriteContainer);
