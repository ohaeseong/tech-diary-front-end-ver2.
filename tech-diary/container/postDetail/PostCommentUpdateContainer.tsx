import React, { ChangeEvent, useCallback, useState } from 'react';
import PostCommentEditor from 'components/post/PostCommentEditor';

type Props = {
    toggleOpenEditor: () => void;

	commentIdx: number;
	comment: string;
};

function PostCommentUpdateContainer({ comment, commentIdx, toggleOpenEditor }: Props) {
	const [commentText, setCommentText] = useState(comment);

	const handleCommentTextState = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length > 1000) {
			return;
		}

		setCommentText(event.target.value);
	}, []);

	const onUpdateComment = useCallback(() => {}, []);

	return (
		<PostCommentEditor
			commentText={commentText}
			isUpdateMode
			toggleOpenEditor={toggleOpenEditor}
			onCommentFunction={onUpdateComment}
			handleCommentTextState={handleCommentTextState}
		/>
	);
}

export default PostCommentUpdateContainer;
