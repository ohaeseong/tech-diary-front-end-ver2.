import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import jwt from 'jsonwebtoken';

import { PostDetail } from 'store/types/post.types';
import PostLikeOption from 'components/post/PostLikeOption';
import PostInfo from 'components/post/PostInfo';
import PostContents from 'components/post/PostContents';
import { getStorage } from 'libs/storage';
import PostComment from './PostComment';
import PostBottom from './PostBottom';
import { asyncForeach } from 'libs/method';
import Toast from 'components/common/Toast';

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

	/* font-family: 'Spoqa Han Sans'; */
	font-size: 2.5rem;
	margin-top: 5rem;
	margin-bottom: 1rem;

	color: ${(props) => props.theme.black};
`;

const Thumbnail = styled.img`
	width: 100%;
	height: 25rem;

	margin-top: 8rem;

	border: 1px solid black;
`;

type Props = {
	data: PostDetail;
};

function SinglePost({ data }: Props) {
	const { title, tagList, createTime, member, contents, thumbnailAddress, like, commentList, id } = data;
	const [userIsLike, setUserIsLike] = useState(false);

	useEffect(() => {
		const token = getStorage('tech-token');
		const tokenDecoded = jwt.decode(token);

		if (tokenDecoded) {
			// await asyncForeach();
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
				like={like.length}
				userIsLike={userIsLike}
				commentCount={commentList.commentData.length}
				postId={id}
			/>
			<SinglePostContentsWrap>
				{thumbnailAddress ? <Thumbnail src={thumbnailAddress} alt="sigle_post_thumbnail" /> : <></>}
				<Title>{title}</Title>
				<PostInfo tagData={tagList.tagData} member={member} createTime={createTime} />
				<PostContents markdown={contents} />
				{/* <PostBottom /> */}
				<PostComment />
			</SinglePostContentsWrap>
			<Toast />
		</SinglePostTemplate>
	);
}

export default SinglePost;
