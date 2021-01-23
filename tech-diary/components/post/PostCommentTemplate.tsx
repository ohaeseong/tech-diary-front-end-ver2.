import React from 'react';
import styled from '@emotion/styled';
import { Comment } from 'store/types/post.types';
import PostCommentItem from 'components/post/PostCommentItem';
import PostCommentWriteContainer from 'container/postDetail/PostCommentWriteContainer';
import { requestGetComment, requestWriteComment } from 'libs/repository';

const PostCommentTemplate = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 30rem;
	margin-left: 1rem;
	margin-bottom: 7rem;
`;

const Header = styled.div`
	width: 100%;
	padding-left: 1rem;
	font-size: 1.4rem;
	color: ${(props) => props.theme.gray_5};
`;

type Props = {
	setCommentList: (dispatch: Comment[]) => void;

	commentList?: Comment[];
	postId: string;
};

function PostComment({ commentList, postId, setCommentList }: Props) {
	return (
		<PostCommentTemplate>
			<Header>{commentList?.length} Comments</Header>
			<PostCommentWriteContainer
				postId={postId}
				setCommentList={setCommentList}
				requestWriteComment={requestWriteComment}
				requestGetComment={requestGetComment}
			/>
			{commentList?.map((item) => {
				return <PostCommentItem key={item.idx} item={item} />;
			})}
		</PostCommentTemplate>
	);
}

export default React.memo(PostComment);
