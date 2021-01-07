/* eslint-disable camelcase */
import React from 'react';
import styled from '@emotion/styled';
import { FaCommentAlt } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

import { Post } from 'store/types/post.types';
import { css } from '@emotion/react';

const PostItemWrap = styled.div`
	width: 100%;
	height: 22rem;

	border-radius: 7px;
	box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.12);
	transition: 0.3s ease-in-out;

	background-color: ${(props) => props.theme.white};

	&:hover {
		transform: translate(0, -10px);
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

	&:hover {
		cursor: pointer;
	}
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
`;

const PostContent = styled.div<{ type: string }>`
	line-height: 2rem;
	padding: 0.1rem 1rem;
	overflow: hidden;
	white-space: normal;
	word-break: break-all;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	color: ${(props) => props.theme.black};

	${(props) => {
		if (props.type === 'title') {
			return css`
				height: 2rem;
				font-size: 0.9rem;
				font-weight: 500;
				padding-top: 5px;
				-webkit-line-clamp: 1;

				&:hover {
					cursor: pointer;
				}
			`;
		}

		if (props.type === 'contents') {
			return css`
				font-size: 0.5rem;
				height: 4rem;
				line-height: 1rem;
				color: ${props.theme.gray_5};
				-webkit-line-clamp: 4;

				&:hover {
					cursor: pointer;
				}
			`;
		}

		if (props.type === 'info') {
			return css`
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			`;
		}

		return null;
	}}
`;

const PostInfo = styled.div`
	font-size: 0.5rem;
	height: 1.5rem;
	padding-top: 0.5rem;
	color: ${(props) => props.theme.gray_3};

	&:hover {
		cursor: pointer;
	}
`;

const UserProfile = styled.img`
	width: 1.8rem;
	height: 1.8rem;
	margin-top: 0.5rem;
	/* border: 1px solid white; */
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(props) => props.theme.white};

	&:hover {
		cursor: pointer;
	}
`;

const PostBottomWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 3rem;

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
	color: ${(props) => props.theme.black};

	& > * {
		padding: 0.3rem;
	}
`;

type Props = {
	item: Post;
};

function PostItem({ item }: Props) {
	const { title, contents, createTime, thumbnailAddress, memberId, commentList, like, member } = item;
	const date = new Date(createTime);
	const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	const thumbnailSrc = thumbnailAddress || '/image/loginTemplateImage.png';
	const profileImage = member.profileImage || '/image/user.png';

	const loadUserPage = () => {
		window.location.href = 'http://localhost:3000/login';
	};

	return (
		<PostItemWrap>
			<ThumbnailWrap>
				<Thumbnail src={thumbnailSrc} alt="thumbnail" />
			</ThumbnailWrap>
			<PostContentsWrap>
				<PostContent type="title">{title}</PostContent>
				<PostContent type="contents">{contents}</PostContent>
				<PostContent type="info">
					<PostInfo>{`${dateFormat} / ${memberId}`}</PostInfo>
					<UserProfile src={profileImage} onClick={loadUserPage} />
				</PostContent>
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
