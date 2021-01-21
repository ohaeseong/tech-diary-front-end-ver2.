import PostReplyComment from 'components/post/PostReplyComment';
import useRequest from 'libs/hooks/useRequest';
import { requestGetReplyComment } from 'libs/repository';
import React, { useEffect, useState } from 'react';
import PostCommentWriteContainer from 'container/postDetail/PostCommentWriteContainer';
import styled from '@emotion/styled';

const ReplyCommentWrap = styled.div`
	width: 100%;
	/* height
	 */
	 /* background-color: ${props => props.theme.gray_0}; */
`;

type Props = {
	postId: string;
	commentIdx: number;
};

function PostReplyCommentContainer({ postId, commentIdx }: Props) {
	const [replyComments, , getReplyComment] = useRequest(requestGetReplyComment);
	const [replyCommentList, setReplyCommentList] = useState([]);

	useEffect(() => {
		const req = {
			commentIdx,
		};
		getReplyComment(req);
	}, [commentIdx, getReplyComment]);

	useEffect(() => {
		if (replyComments) {
			setReplyCommentList(replyComments.data.commentList);
		}
	}, [replyComments]);

	return (
		<ReplyCommentWrap>
			{replyComments ? <PostReplyComment replyCommentList={replyCommentList} /> : <></>}
			<PostCommentWriteContainer />
		</ReplyCommentWrap>
	);
}

export default PostReplyCommentContainer;
