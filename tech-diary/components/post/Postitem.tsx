/* eslint-disable camelcase */
import React from 'react';
import styled from '@emotion/styled';
import { FaCommentAlt } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

import { color } from 'styles/color';
import { Post } from 'store/types/post.types';
import { css } from '@emotion/react';

const PostItemWrap = styled.div`
	width: 100%;
	height: 22rem;

	border-radius: 7px;
	box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.12);
	transition: 0.2s ease-in-out;

	background-color: ${color.white};

	&:hover {
		cursor: pointer;
		transform: translate(0, -20px);
	}
`;

const ThumbnailWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 10rem;
	overflow: hidden;

	border-radius: 7px 7px 0px 0px;
`;

const Thumbnail = styled.img`
	width: 100%;
	height: auto;
`;

const PostContentsWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 12rem;
	/* border: 1px solid black; */
`;

const PostContent = styled.div<{ type: string }>`
	line-height: 2rem;
	padding: 0.1rem 1rem;
	overflow: hidden;
	white-space: normal;
	word-break: break-all;
	display: -webkit-box;
	-webkit-box-orient: vertical;

	${(props) => {
		if (props.type === 'title') {
			return css`
				height: 2rem;
				font-size: 0.9rem;
				font-weight: 500;
				padding-top: 5px;
				-webkit-line-clamp: 1;
			`;
		}

		if (props.type === 'contents') {
			return css`
				font-size: 0.5rem;
				height: 4rem;
				line-height: 1rem;
				color: ${color.gray_5};
				-webkit-line-clamp: 4;
			`;
		}

		if (props.type === 'info') {
			return css`
				font-size: 0.5rem;
				height: 1.5rem;
				padding-top: 0.5rem;
				color: ${color.gray_3};
			`;
		}

		return null;
	}}
`;

const PostBottomWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 3rem;
	/* margin-top: 0.5rem */
	/* border: 1px solid black; */

	& > * {
		margin: 0.8rem;
		font-size: 0.1rem;
	}
`;

const IconWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;

	& > * {
		padding: 0.3rem;
	}
`;

type Props = {
	item: Post;
};

function PostItem({ item }: Props) {
	const { title, contents, createTime, thumbnailAddress, memberId, commentList, like } = item;
	const date = new Date(createTime);
	const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	const thumbnailSrc = thumbnailAddress || '/image/loginTemplateImage.png';

	return (
		<PostItemWrap>
			<ThumbnailWrap>
				<Thumbnail src={thumbnailSrc} alt="thumbnail" />
			</ThumbnailWrap>
			<PostContentsWrap>
				<PostContent type="title">{title}</PostContent>
				<PostContent type="contents">{contents}</PostContent>
				<PostContent type="info">{`${dateFormat} / ${memberId}`}</PostContent>
				<PostBottomWrap>
					<IconWrap>
						<FaCommentAlt size="15" color="#126CED" />
						{commentList}
					</IconWrap>
					<IconWrap>
						<FcLike size="15" />
						{like}
					</IconWrap>
				</PostBottomWrap>
			</PostContentsWrap>
		</PostItemWrap>
	);
}

export default PostItem;
