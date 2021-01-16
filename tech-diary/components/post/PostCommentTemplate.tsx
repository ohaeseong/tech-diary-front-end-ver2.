import React from 'react';
import styled from '@emotion/styled';
import { Comment } from 'store/types/post.types';
import PostCommentItem from 'components/post/PostCommentItem';
import PostCommentEditor from 'components/post/PostCommentEditor';

const PostCommentTemplate = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 30rem;
	margin-left: 1rem;

	/* border: 1px solid black; */

	margin-bottom: 5rem;
`;

const Header = styled.div`
	width: 100%;
	height: 5rem;
	line-height: 5rem;
	padding-left: 1rem;
	font-size: 1.4rem;


	/* border-bottom: 1px solid black; */
	color: ${(props) => props.theme.gray_5};
`;

type Props = {
	commentList?: Comment[];
	postId: string;
};

function PostComment({ commentList, postId }: Props) {

	return (
		<PostCommentTemplate>
			<Header>{commentList?.length} Comments</Header>
			<PostCommentEditor postId={postId} />
			{commentList?.map((item) => {
				return <PostCommentItem key={item.idx} item={item} />;
			})}
		</PostCommentTemplate>
	);
}

export default PostComment;
