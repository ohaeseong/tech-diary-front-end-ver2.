import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import jwt from 'jsonwebtoken';

import { Comment, PostDetail } from 'store/types/post.types';
import PostLikeOption from 'components/post/PostLikeOption';
import PostInfo from 'components/post/PostInfo';
import PostContents from 'components/post/PostContents';
import { getStorage } from 'libs/storage';
import PostComment from 'components/post/PostCommentTemplate';
import { TypeDecoded } from 'store/types/auth.types';
import PostBottom from 'components/post/PostBottom';
import { ToastContainer } from 'react-toastify';

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
`;

const Title = styled.div`
	width: 100%;

	font-size: 2.5rem;
	margin-top: 5rem;
	margin-bottom: 1rem;

	color: ${(props) => props.theme.black};
`;

const Thumbnail = styled.img`
	margin-top: 8rem;
	object-fit: contain;
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
	copyUrl: () => void;
	dispatchForUpdateState: () => void;
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
	moveToComment,
	dispatchForUpdateState,
	setCommentList,

	optionState,
	commentList,
	data,
	bookMarkToggleValue,
	shareItemOpenToggleValue,
}: Props) {
	const { title, tagList, createTime, member, contents, thumbnailAddress, like, id } = data;
	const [userIsLike, setUserIsLike] = useState(false);

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		const tokenDecoded = jwt.decode(token) as TypeDecoded;

		if (tokenDecoded) {
			like.forEach((likeData) => {
				if (likeData.memberId === tokenDecoded.memberId.toString()) {
					setUserIsLike(true);
				}
			});
		}
	}, [like]);

	return (
		<SinglePostTemplate>
			<PostLikeOption
				userIsLike={userIsLike}
				optionState={optionState}
				shareItemOpenToggleValue={shareItemOpenToggleValue}
				toggleLike={toggleLike}
				toggleBookMark={toggleBookMark}
				toggleShareItemOpen={toggleShareItemOpen}
				bookMarkToggleValue={bookMarkToggleValue}
				closeShareItem={closeShareItem}
				copyUrl={copyUrl}
				moveToComment={moveToComment}
				dispatchForUpdateState={dispatchForUpdateState}
			/>
			<SinglePostContentsWrap>
				{thumbnailAddress ? <Thumbnail src={thumbnailAddress} alt="sigle_post_thumbnail" /> : <></>}
				<Title>{title}</Title>
				<PostInfo tagData={tagList.tagData} member={member} createTime={createTime} />
				<PostContents markdown={contents} />
				<PostBottom />
				<PostComment commentList={commentList} postId={id} setCommentList={setCommentList} />
			</SinglePostContentsWrap>
			<ToastContainer autoClose={1000} key="adf" />
		</SinglePostTemplate>
	);
}

export default SinglePost;
