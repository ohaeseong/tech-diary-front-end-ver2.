import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { Comment, PostDetail, PostLink } from 'store/types/post.types';
import PostLikeOption from 'components/post/PostLikeOption';
import PostInfo from 'components/post/PostInfo';
import PostContents from 'components/post/PostContents';
import PostComment from 'components/post/PostCommentTemplate';
import { mediaQuery } from 'components/layout/responsive';
import PostHeadingLinkList from 'components/post/PostHeadingLinkList';

const SinglePostTemplate = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	background-color: ${(props) => props.theme.white_1};
	margin-top: 2rem;
`;

const SinglePostContentsWrap = styled.div`
	display: flex;
	width: 50rem;
	min-height: 100vh;
	flex-direction: column;
	background-color: ${(props) => props.theme.white_1};
	margin-top: 5rem;

	${mediaQuery(768)} {
		width: 90%;
	}
`;

const Title = styled.div`
	width: 100%;

	font-size: 2.5rem;
	margin-top: 5rem;
	margin-bottom: 1rem;

	color: ${(props) => props.theme.black};

	${mediaQuery(768)} {
		font-size: 1.5rem;
	}
`;

type OptionState = {
	isLike: boolean;
	likeCount: number;
};

type Props = {
	toggleLike: () => void;
	toggleBookMark: () => void;
	toggleShareItemOpen: () => void;
	moveToComment: () => void;
	closeShareItem: () => void;
	openConfirmModal: () => void;
	goEditPostPage: () => void;
	copyUrl: () => void;
	sharePostToFacebook: () => void;
	sharePostToTwitter: () => void;
	isFollowMember: () => void;
	setCommentList: (dispatch: Comment[]) => void;

	dispatchForUpdateState: any;
	userIsFollow: boolean;
	optionState: OptionState;
	data: PostDetail;
	commentList: Comment[];
	bookMarkToggleValue: boolean;
	shareItemOpenToggleValue: boolean;
	linkList: PostLink[];
	isMine: boolean;
	userIsLike: boolean;
};

function SinglePost({
	toggleLike,
	toggleBookMark,
	toggleShareItemOpen,
	closeShareItem,
	copyUrl,
	sharePostToFacebook,
	sharePostToTwitter,
	openConfirmModal,
	moveToComment,
	goEditPostPage,
	isFollowMember,
	setCommentList,
	dispatchForUpdateState,

	userIsFollow,
	linkList,
	optionState,
	commentList,
	data,
	bookMarkToggleValue,
	shareItemOpenToggleValue,
	userIsLike,
	isMine,
}: Props) {
	const { title, tagList, createTime, member, contents, thumbnailAddress, id, followers } = data;

	return (
		<>
			<SinglePostTemplate>
				<PostLikeOption
					userIsLike={userIsLike}
					optionState={optionState}
					shareItemOpenToggleValue={shareItemOpenToggleValue}
					toggleLike={toggleLike}
					isFollowMember={isFollowMember}
					toggleBookMark={toggleBookMark}
					toggleShareItemOpen={toggleShareItemOpen}
					bookMarkToggleValue={bookMarkToggleValue}
					closeShareItem={closeShareItem}
					userIsFollow={userIsFollow}
					copyUrl={copyUrl}
					sharePostToTwitter={sharePostToTwitter}
					isMine={isMine}
					sharePostToFacebook={sharePostToFacebook}
					moveToComment={moveToComment}
					dispatchForUpdateState={dispatchForUpdateState}
				/>
				<SinglePostContentsWrap>
					{thumbnailAddress ? (
						<Image
							src={thumbnailAddress}
							alt="sigle_post_thumbnail"
							width={500}
							height={400}
							objectFit="contain"
							loading="eager"
						/>
					) : (
						<></>
					)}
					<Title>{title}</Title>
					<PostInfo
						tagData={tagList.tagData}
						member={member}
						createTime={createTime}
						isMine={isMine}
						followers={followers}
						openConfirmModal={openConfirmModal}
						goEditPostPage={goEditPostPage}
					/>
					<PostContents markdown={contents} />
					{/* <PostBottom /> */}
					<PostComment commentList={commentList} postId={id} setCommentList={setCommentList} />
				</SinglePostContentsWrap>
				{linkList.length !== 0 ? (
					<div>
						<PostHeadingLinkList linkList={linkList} />
					</div>
				) : (
					<></>
				)}
			</SinglePostTemplate>
		</>
	);
}

export default React.memo(SinglePost);
