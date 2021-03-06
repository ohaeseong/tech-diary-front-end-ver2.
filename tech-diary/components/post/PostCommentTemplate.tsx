import React from 'react';
import styled from '@emotion/styled';
import { Comment } from 'store/types/post.types';
import PostCommentWriteContainer from 'container/postDetail/PostCommentWriteContainer';
import { requestGetComment, requestWriteComment } from 'libs/repository';
import { RootState } from 'store/modules';
import { useSelector } from 'react-redux';
import PostCommentContainer from 'container/postDetail/PostCommentContainer';
import { mediaQuery } from 'components/layout/responsive';

const PostCommentTemplate = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 30rem;
	margin-left: 1rem;
	margin-bottom: 7rem;
	margin-top: 7rem;

	${mediaQuery(768)} {
		margin: 0rem;
		margin-top: 5rem;
	}
`;

const Header = styled.div`
	width: 100%;
	padding-left: 1rem;
	font-size: 1.4rem;
	color: ${(props) => props.theme.gray_5};

	${mediaQuery(768)} {
		padding: 0rem;
		padding-top: 1rem;
		font-size: 1rem;
	}
`;

type Props = {
	setCommentList: (dispatch: Comment[]) => void;

	commentList?: Comment[];
	postId: string;
};

function PostComment({ commentList, postId, setCommentList }: Props) {
	const { commentCount } = useSelector((state: RootState) => state.postComment);
	return (
		<PostCommentTemplate>
			<Header>{commentCount} Comments</Header>
			<PostCommentWriteContainer
				postId={postId}
				setCommentList={setCommentList}
				requestWriteComment={requestWriteComment}
				requestGetComment={requestGetComment}
			/>
			{commentList?.map((item) => {
				return <PostCommentContainer key={item.idx} item={item} setCommentList={setCommentList} />;
			})}
		</PostCommentTemplate>
	);
}

export default React.memo(PostComment);
