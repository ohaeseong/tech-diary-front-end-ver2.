import React from 'react';
import styled from '@emotion/styled';
import { PostDetail } from 'store/types/post.types';
import PostLikeOption from 'components/post/PostLikeOption';
import PostInfo from 'components/post/PostInfo';
import PostContents from 'components/post/PostContents';

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

	font-family: 'Spoqa Han Sans';
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
	const { title, tagList, createTime, member, contents, thumbnailAddress, like, commentList } = data;

	return (
		<SinglePostTemplate>
			<PostLikeOption like={like} userIsLike commentCount={commentList.commentData.length} />
			<SinglePostContentsWrap>
				{thumbnailAddress ? <Thumbnail src={thumbnailAddress} alt="sigle_post_thumbnail" /> : <></>}
				<Title>{title}</Title>
				<PostInfo tagData={tagList.tagData} member={member} createTime={createTime} />
				<PostContents markdown={contents} />
			</SinglePostContentsWrap>
		</SinglePostTemplate>
	);
}

export default SinglePost;
