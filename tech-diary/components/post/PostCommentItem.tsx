import React from 'react';
import styled from '@emotion/styled';
import { Comment } from 'store/types/post.types';
import MarkdownRenderer from 'components/common/MarkdownRenderer';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import useToggle from 'libs/hooks/useToggle';
import PostReplyCommentContainer from 'container/postDetail/PostReplyCommentContainer';

const PostCommentItemWrap = styled.div<{ isReply?: boolean }>`
	display: flex;
	flex-direction: row;
	width: 100%;
	min-height: 8rem;
	padding: 1.5rem 0;

	& > * {
		font-family: 'Spoqa Han Sans Thin';
	}

	border-bottom: 1px solid ${(props) => props.theme.gray_2};

	/* ${(props) => props.isReply && `background-color: #F8F9F9`}; */
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
	padding: 0rem 0.5rem;
	overflow: hidden;
	margin-bottom: 1rem;
	font-family: 'Spoqa Han Sans Thin';

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
	margin: 0.5rem 1rem 0 0.5rem;

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

const ReplyButtonWrap = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 2rem;
	margin-bottom: 2rem;
	/* border: 1px solid black; */

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

type Props = {
	item: Comment;
	isReply?: boolean;
};

function PostCommentItem({ item, isReply }: Props) {
	const [replyIsOpen, toggle] = useToggle(false);
	const { commentTxt, createDate, member, postId, replyComments, idx } = item;
	const { memberName, profileImage } = member;
	const date = new Date(createDate);
	const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	const replyCommentCountText = replyComments?.length ? `${replyComments.length}개의 답글` : '답글 달기';
	const profileImageSource = profileImage || '/image/user.png';
	const toggleReplyOpen = () => {
		toggle();
	};

	return (
		<PostCommentItemWrap isReply={isReply}>
			<ProfileImageWrap>
				<ProfileImage src={profileImageSource} />
			</ProfileImageWrap>
			<PostCommentItemContentsWrap>
				<Head>
					<UserInfoText>{memberName}</UserInfoText>
					<DateInfoText>{dateFormat}</DateInfoText>
				</Head>
				<CommentText>
					<MarkdownRenderer markdown={commentTxt} type="comment" />
				</CommentText>
				{isReply ? (
					<></>
				) : (
					<ReplyButtonWrap>
						<BiMessageRoundedAdd size="1.2em" />
						<ReplyButton onClick={toggleReplyOpen}>{!replyIsOpen ? replyCommentCountText : '답글 숨기기'}</ReplyButton>
					</ReplyButtonWrap>
				)}
				{replyIsOpen ? <PostReplyCommentContainer postId={postId} commentIdx={idx} /> : <></>}
			</PostCommentItemContentsWrap>
		</PostCommentItemWrap>
	);
}

export default React.memo(PostCommentItem);
