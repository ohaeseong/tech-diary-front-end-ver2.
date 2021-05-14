import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import jwt from 'jsonwebtoken';

import { Comment, PostDetail } from 'store/types/post.types';
import PostLikeOption from 'components/post/PostLikeOption';
import PostInfo from 'components/post/PostInfo';
import PostContents from 'components/post/PostContents';
import { getStorage } from 'libs/storage';
import PostComment from 'components/post/PostCommentTemplate';
import { TypeDecoded } from 'store/types/auth.types';
// import PostBottom from 'components/post/PostBottom';
const SinglePostTemplate = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	background-color: ${(props) => props.theme.white_1};
	margin-top: 5rem;
`;

const SinglePostContentsWrap = styled.div`
	display: flex;
	width: 50rem;
	min-height: 100vh;
	flex-direction: column;
	margin-left: 3rem;
	background-color: ${(props) => props.theme.white_1};
	margin-top: 5rem;
`;

const Title = styled.div`
	width: 100%;

	font-size: 2.5rem;
	margin-top: 5rem;
	margin-bottom: 1rem;

	color: ${(props) => props.theme.black};
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
	dispatchForUpdateState: any;
	userIsFollow: boolean;
	setCommentList: (dispatch: Comment[]) => void;

	optionState: OptionState;
	data: PostDetail;
	commentList: Comment[];
	bookMarkToggleValue: boolean;
	shareItemOpenToggleValue: boolean;
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
	userIsFollow,
	dispatchForUpdateState,
	setCommentList,

	optionState,
	commentList,
	data,
	bookMarkToggleValue,
	shareItemOpenToggleValue,
}: Props) {
	const { title, tagList, createTime, member, contents, thumbnailAddress, like, id, memberId, followers } = data;
	const [userIsLike, setUserIsLike] = useState(false);
	const [isMine, setIsMine] = useState(false);

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		const tokenDecoded = jwt.decode(token) as TypeDecoded;

		if (tokenDecoded) {
			like.forEach((likeData) => {
				if (likeData.memberId === tokenDecoded.memberId.toString()) {
					setUserIsLike(true);
				}
			});

			if (tokenDecoded.memberId === memberId) {
				setIsMine(true);
			}
		}
	}, [like, memberId]);

	return (
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
						priority
						// priority
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
		</SinglePostTemplate>
	);
}

export default React.memo(SinglePost);
