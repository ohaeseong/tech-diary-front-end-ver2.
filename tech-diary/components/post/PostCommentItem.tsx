import React from 'react';
import styled from '@emotion/styled';
import { Comment } from 'store/types/post.types';
import MarkdownRenderer from 'components/common/MarkdownRenderer';

const PostCommentItemWrap = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	min-height: 8rem;
	padding: 1.5rem 0;

	& > * {
		font-family: 'Spoqa Han Sans Thin';
	}

	border-bottom: 1px solid ${(props) => props.theme.gray_2};
`;

const Head = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 2rem;

	/* border: 1px solid black; */
`;

const PostCommentItemContentsWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const CommentText = styled.div`
	width: 100%;
	height: 100%;
	padding: 0rem 0.5rem;

	line-height: 1.7rem;

	font-family: 'Spoqa Han Sans Thin';
`;

const UserInfoText = styled.a`
	font-size: 1rem;
	/* line-height: 2rem; */
	height: 1.2rem;
	margin: 0.5rem 0 0 0.5rem;
	/* border: 1px solid black; */
	cursor: ;

	color: ${(props) => props.theme.black};
`;

const DateInfoText = styled.span`
	font-size: 0.8rem;
	line-height: 2rem;
	margin: 0.5rem 0 0 0.5rem;

	color: ${(props) => props.theme.gray_5};
`;

const ProfileImageWrap = styled.div`
	display: flex;
	justify-content: center;
	width: 6rem;
	height: 100%;
`;

const ProfileImage = styled.img`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
`;

type Props = {
	item: Comment;
};

function PostCommentItem({ item }: Props) {
	const { commentTxt, createDate, member } = item;
	const { memberName, profileImage } = member;
	const date = new Date(createDate);
	const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	return (
		<PostCommentItemWrap>
			<ProfileImageWrap>
				<ProfileImage src={profileImage} />
			</ProfileImageWrap>
			<PostCommentItemContentsWrap>
				<Head>
					<UserInfoText>{memberName}</UserInfoText>
					<DateInfoText>{dateFormat}</DateInfoText>
				</Head>
				<CommentText>
					<MarkdownRenderer markdown={commentTxt} type="comment" />
				</CommentText>
			</PostCommentItemContentsWrap>
		</PostCommentItemWrap>
	);
}

export default PostCommentItem;
