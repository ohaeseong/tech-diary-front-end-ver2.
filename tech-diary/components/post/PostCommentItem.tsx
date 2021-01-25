import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import jwt from 'jsonwebtoken';
import { BiMessageRoundedAdd } from 'react-icons/bi';

import { Comment } from 'store/types/post.types';
import MarkdownRenderer from 'components/common/MarkdownRenderer';
import useToggle from 'libs/hooks/useToggle';
import PostReplyCommentContainer from 'container/postDetail/PostReplyCommentContainer';
import { TypeDecoded } from 'store/types/auth.types';
import { getStorage } from 'libs/storage';
import PostCommentUpdateContainer from 'container/postDetail/PostCommentUpdateContainer';
import PostReplyComment from './PostReplyComment';

const PostCommentItemWrap = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	min-height: 8rem;
	padding: 1rem 0;

	& > * {
		font-family: 'Spoqa Han Sans Thin';
	}
`;

const Head = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 2rem;
`;

const PostCommentItemContentsWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const CommentText = styled.div`
	max-width: 100%;
	height: 100%;
	padding: 0rem 1rem;
	overflow: hidden;
	margin-bottom: 1rem;
	font-family: 'Spoqa Han Sans Thin';
	margin-top: 1rem;
	border-radius: 5px;
	box-shadow: 0 2px 6px 0 ${(props) => props.theme.shadow};

	& > * pre {
		max-width: 41.5rem;
	}
`;

const UserInfoText = styled.a`
	font-size: 1rem;
	height: 1.2rem;
	margin: 0.5rem 0 0 0.5rem;
	cursor: pointer;

	color: ${(props) => props.theme.black};
`;

const DateInfoText = styled.span`
	font-size: 0.8rem;
	line-height: 2rem;
	margin-right: 0.5rem;

	color: ${(props) => props.theme.gray_5};
`;

const ProfileImageWrap = styled.div`
	display: flex;
	justify-content: center;
	width: 4rem;
	height: 100%;
`;

const ProfileImage = styled.img`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
`;

const ReplyButtonWrap = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 2rem;
	margin-bottom: 1rem;
	justify-content: space-between;
`;

const SubButtonWrap = styled.div`
	display: flex;
	align-items: center;
	& > * {
		cursor: pointer;
		color: ${(props) => props.theme.gray_5};
	}

	& > button {
		color: ${(props) => props.theme.gray_5};
	}
`;

const ReplyButton = styled.button`
	background-color: rgba(255, 255, 255, 0);
	border: none;
	outline: none;
	font-size: 1rem;

	font-family: 'Spoqa Han Sans Regular';
`;

const EditButton = styled.span`
	font-family: 'Spoqa Han Sans Thin';
	font-size: 0.9rem;
	margin-left: 0.5rem;
`;

type Props = {
	deleteComment?: () => void;
	item: Comment;
	isReply?: boolean;
};

function PostCommentItem({ item, isReply, deleteComment }: Props) {
	const [replyIsOpen, toggle] = useToggle(false);
	const [openEdit, toggleOpenEdit] = useToggle(false);
	const [isMine, setIsMine] = useState(false);
	const { commentTxt, createDate, member, postId, replyComments, idx, memberId } = item;
	const { memberName, profileImage } = member;
	const date = new Date(createDate);
	const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	const replyCommentCountText = replyComments?.length ? `${replyComments.length}개의 답글` : '답글 달기';
	const profileImageSource = profileImage || '/image/user.png';
	const toggleReplyOpen = () => {
		toggle();
	};

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		const tokenDecoded = jwt.decode(token) as TypeDecoded;

		if (token) {
			if (tokenDecoded.memberId.toString() === memberId) {
				setIsMine(true);
			}
		}
	}, [memberId]);

	return (
		<PostCommentItemWrap>
			<ProfileImageWrap>
				<ProfileImage src={profileImageSource} />
			</ProfileImageWrap>
			<PostCommentItemContentsWrap>
				<Head>
					<UserInfoText>{memberName}</UserInfoText>
					<DateInfoText>{dateFormat}</DateInfoText>
				</Head>
				<>
					{openEdit ? (
						<PostCommentUpdateContainer comment={commentTxt} commentIdx={idx} toggleOpenEditor={toggleOpenEdit} />
					) : (
						<CommentText>
							<MarkdownRenderer markdown={commentTxt} />
						</CommentText>
					)}
				</>
				<ReplyButtonWrap>
					{isReply ? (
						<>
							{isMine && !openEdit ? (
								<>
									<SubButtonWrap />
									<SubButtonWrap>
										<EditButton onClick={toggleOpenEdit}>수정</EditButton>
										<EditButton onClick={deleteComment}>삭제</EditButton>
									</SubButtonWrap>
								</>
							) : (
								<></>
							)}
						</>
					) : (
						<>
							<SubButtonWrap>
								<BiMessageRoundedAdd size="1.2em" />
								<ReplyButton onClick={toggleReplyOpen}>
									{!replyIsOpen ? replyCommentCountText : '답글 숨기기'}
								</ReplyButton>
							</SubButtonWrap>
							{isMine && !openEdit ? (
								<SubButtonWrap>
									<EditButton onClick={toggleOpenEdit}>수정</EditButton>
									<EditButton onClick={deleteComment}>삭제</EditButton>
								</SubButtonWrap>
							) : (
								<></>
							)}
						</>
					)}
				</ReplyButtonWrap>
				{replyIsOpen ? <PostReplyComment postId={postId} commentIdx={idx} replyCommentList={replyComments} /> : <></>}
			</PostCommentItemContentsWrap>
		</PostCommentItemWrap>
	);
}

export default React.memo(PostCommentItem);
