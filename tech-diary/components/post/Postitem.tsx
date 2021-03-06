/* eslint-disable camelcase */
import React from 'react';
import styled from '@emotion/styled';
import { FaComment } from 'react-icons/fa';
import { AiTwotoneStar } from 'react-icons/ai';
import Image from 'next/image';

import { Post } from 'store/types/post.types';
import { css } from '@emotion/react';
import Link from 'next/link';
import { color } from 'styles/color';
import { mediaQuery } from 'components/layout/responsive';

const PostItemWrap = styled.div`
	width: 20rem;
	height: 28rem;

	border-radius: 7px;
	box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.12);
	transition: 0.2s ease-in-out;

	background-color: ${(props) => props.theme.white};
	&:hover {
		transform: translate(0, -10px);
	}

	${mediaQuery(1408)} {
		width: calc(25% - 2rem);
	}
	${mediaQuery(1312)} {
		width: calc(33% - 1.8125rem);
	}

	${mediaQuery(1056)} {
		width: calc(50% - 2rem);
	}

	${mediaQuery(1024)} {
		height: 30rem;
	}
	${mediaQuery(767)} {
		margin: 0;
		width: 100%;
		& + & {
			margin-top: 2rem;
		}
	}
`;

const ThumbnailWrap = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 10rem;
	margin-bottom: 1rem;
	overflow: hidden;

	border-radius: 7px 7px 0px 0px;

	&:hover {
		cursor: pointer;
	}

	${mediaQuery(1024)} {
		height: 12rem;
	}
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
				height: 4.5rem;
				font-size: 0.9rem;
				font-weight: 500;
				-webkit-line-clamp: 1;

				&:hover {
					cursor: pointer;
				}
			`;
		}

		if (props.type === 'contents') {
			return css`
				font-size: 0.5rem;
				height: 12.3rem;
				line-height: 1.2rem;
				color: ${props.theme.gray_5};
				-webkit-line-clamp: 5;

				&:hover {
					cursor: pointer;
				}

				${mediaQuery(768)} {
					line-height: 1rem;
					height: 5rem;
				}
			`;
		}

		if (props.type === 'info') {
			return css`
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 1rem;
			`;
		}

		return null;
	}}
`;

const PostInfo = styled.div`
	font-size: 0.5rem;
	height: 4rem;
	padding-top: 0.5rem;
	color: ${(props) => props.theme.gray_3};

	&:hover {
		cursor: pointer;
	}

	& > a {
		color: ${(props) => props.theme.gray_3};
		text-decoration: none;
	}
`;

const UserProfile = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	margin-top: 0.5rem;
	object-fit: cover;
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
	/* height: 4rem; */
	margin-bottom: -4.5rem;

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
	margin-top: 1rem;

	& > * {
		padding: 0.3rem;
		margin-top: 0.3rem;
		margin-bottom: 0.3rem;
	}
`;

type Props = {
	item: Post;
};

function PostItem({ item }: Props) {
	const { title, contents, createTime, thumbnailAddress, memberId, likes, member, commentCount, intro, url } = item;

	const date = new Date(createTime);
	const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	const thumbnailSrc = thumbnailAddress || '/static/loginTemplateImage.png';
	const profileImage = member.profileImage || '/static/user.png';

	const onlySlug = url.split('/');

	return (
		<PostItemWrap>
			<Link href={`/${memberId}/${onlySlug[2]}`}>
				<ThumbnailWrap>
					<Image src={thumbnailSrc} alt="thumbnail" objectFit="cover" className="thumbnail" layout="fill" />
				</ThumbnailWrap>
			</Link>
			<PostContentsWrap>
				<Link href={`/${memberId}/${onlySlug[2]}`}>
					<PostContent type="title">{title}</PostContent>
				</Link>
				<Link href={`/${memberId}/${onlySlug[2]}`}>
					{intro ? (
						<PostContent type="contents">{intro}</PostContent>
					) : (
						<PostContent type="contents">{contents}</PostContent>
					)}
				</Link>
				<PostContent type="info">
					<PostInfo>
						{`${dateFormat} /`} <Link href={`/${memberId}`}>{memberId}</Link>
					</PostInfo>
					<Link href={`/${memberId}`}>
						<UserProfile src={profileImage} alt="profile_image" />
					</Link>
				</PostContent>
				<PostBottomWrap>
					<IconWrap>
						<FaComment size="15" color={color.black} />
						{commentCount}
					</IconWrap>
					<IconWrap>
						<AiTwotoneStar size="15" color={color.black} />
						{likes.length}
					</IconWrap>
				</PostBottomWrap>
			</PostContentsWrap>
		</PostItemWrap>
	);
}

export default PostItem;
