import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AiFillBulb, AiOutlineShareAlt } from 'react-icons/ai';
import { ImLink } from 'react-icons/im';
import { FaComment, FaTwitter, FaFacebook } from 'react-icons/fa';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import { MdArrowDropDown } from 'react-icons/md';
import { Router, useRouter } from 'next/router';

import { color } from 'styles/color';
import { moveLeft, moveDown, moveAngle } from 'styles/animation';
import Button from 'components/common/Button';
import { requestPostLike, useRequest } from 'libs/hooks/useApi';
import { getStorage } from 'libs/storage';
import { server } from 'config/config';
import { useDispatch } from 'react-redux';
import { DROP_TOAST, SHOW_TOAST } from 'store/modules/toast';

const PostLikeOptionBlock = styled.div`
	position: sticky;
	width: 5rem;
	height: 12rem;
	margin-top: 15rem;
	margin-left: -5rem;
	top: 9rem;

	/* border: 1px solid black; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const MainIconWrap = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const ItemWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;

	margin-bottom: 1rem;
`;

const SubIconWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* align-items: center; */
	width: 100%;
	padding-top: 1rem;

	& > * {
		color: ${(props) => props.theme.gray_4};
	}

	padding-right: 0.5rem;
`;

const FollowWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-top: 1px solid ${(props) => props.theme.gray_2};

	padding-top: 1rem;
`;

const CountWrap = styled.span`
	text-align: center;
	width: 100%;

	color: ${(props) => props.theme.gray_4};
`;

const ShareIconWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	/* position: relative; */
	width: 2.6rem;
	height: 2.6rem;
	border-radius: 50%;
	padding: 0.01rem;
	background-color: ${(props) => props.theme.white_1};
`;

const ShareItem = styled.span`
	position: absolute;
	margin-left: 0.2rem;
	margin-top: 0.1rem;
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	text-align: center;
	line-height: 2rem;
	transition: 0.2s ease-in-out;
	z-index: -1;

	cursor: pointer;

	& > * {
		color: ${(props) => props.theme.gray_5};
	}
`;

const ShareItemWrap = styled.div<{ isOpen: boolean }>`
	position: absolute;

	transition: 0.2s ease-in-out;
	${(props) => {
		if (props.isOpen) {
			return css`
				& span:nth-of-type(1) {
					margin-top: 2.7rem;
					margin-left: -2.7rem;
					z-index: -1;
					animation: ${moveAngle} 0.5s;
				}

				& span:nth-of-type(2) {
					margin-top: -0.5rem;
					margin-left: -3rem;
					z-index: -1;
					animation: ${moveLeft} 0.5s;
				}

				& span:nth-of-type(3) {
					margin-top: 3.5rem;
					margin-left: 0.5rem;
					z-index: -1;
					animation: ${moveDown} 0.5s;
				}
			`;
		}
	}}
`;

const BookmarkWrap = styled.div`
	/* width: 100%; */
	display: flex;
	align-items: center;
	/* padding-right: 0.3rem; */
	/* border: 1px solid black; */
`;

type Props = {
	like: number;
	commentCount: number;
	userIsLike: boolean;
	userIsBookMark?: boolean;
	userIsFollow?: boolean;
	postId: string;
};

function PostLikeOption({ like, userIsLike, commentCount, userIsBookMark, userIsFollow, postId }: Props) {
	const [isLike, setIsLike] = useState(userIsLike);
	const [isBookMark, setIsBookMark] = useState(userIsBookMark);
	const [isShareItemOpen, setIsShareItemOpen] = useState(false);
	const [likeCount, setLikeCount] = useState(like);
	const router = useRouter();
	const dispatch = useDispatch();

	const toggleLike = useCallback(() => {
		const token = getStorage('tech-token');
		if (!token) {
			alert('로그인 후 이용해 주세요!');

			return;
		}

		if (isLike) {
			setIsLike(false);
			setLikeCount(likeCount - 1);
		} else {
			setIsLike(true);

			setLikeCount(likeCount + 1);
		}

		useRequest(requestPostLike, postId);
	}, [isLike, likeCount, postId]);

	const toggleBookMark = useCallback(() => {
		const token = getStorage('tech-token');
		if (!token) {
			alert('로그인 후 이용해 주세요!');

			return;
		}

		if (isBookMark) {
			setIsBookMark(false);
		} else {
			setIsBookMark(true);
		}
	}, [isBookMark]);

	const toggleShareItemOpen = useCallback(() => {
		if (isShareItemOpen) {
			setIsShareItemOpen(false);
		} else {
			setIsShareItemOpen(true);
		}
	}, [isShareItemOpen]);

	const moveToComment = () => {
		if (document.querySelector('body')) {
			const location = document.querySelector('body')?.clientHeight;
			window.scrollTo({ top: location, left: 0, behavior: 'smooth' });
		}
	};

	const closeShareItem = useCallback(() => {
		if (isShareItemOpen) {
			setIsShareItemOpen(false);
		}
	}, [isShareItemOpen]);

	const copyUrl = () => {
		navigator.clipboard.writeText(`${server.client_url}${router.asPath}`);

		dispatch({
			type: SHOW_TOAST,
			payload: {
				text: '링크 주소를 복사했습니다!',
			},
		});

		setTimeout(() => {
			dispatch({
				type: DROP_TOAST,
			});
		}, 2000);
	};

	useEffect(() => {
		document.body.addEventListener('click', closeShareItem);

		return () => document.body.removeEventListener('click', closeShareItem);
	}, [closeShareItem]);

	useEffect(() => {
		setIsLike(userIsLike);
	}, [userIsLike]);

	return (
		<PostLikeOptionBlock>
			<ItemWrap>
				{isLike ? (
					<>
						<MainIconWrap>
							<AiFillBulb size="1.7rem" color={color.star} cursor="pointer" onClick={toggleLike} />
						</MainIconWrap>
						<CountWrap>{likeCount}</CountWrap>
					</>
				) : (
					<>
						<MainIconWrap>
							<AiFillBulb size="1.7rem" color={color.gray_4} cursor="pointer" onClick={toggleLike} />
						</MainIconWrap>
						<CountWrap>{likeCount}</CountWrap>
					</>
				)}
			</ItemWrap>
			<ItemWrap>
				<MainIconWrap>
					<FaComment size="1.2rem" color="#4f95ef" cursor="pointer" onClick={moveToComment} />
				</MainIconWrap>
				<CountWrap>{commentCount}</CountWrap>
			</ItemWrap>
			<FollowWrap>
				{userIsFollow ? (
					<Button size="sm" margin="0" color={color.neon_2} height="1.8rem">
						Following
						<MdArrowDropDown size="1rem" />
					</Button>
				) : (
					<Button size="sm" margin="0" color={color.neon_2} height="1.8rem">
						Follow
					</Button>
				)}
			</FollowWrap>
			<SubIconWrap>
				<ShareIconWrap onClick={toggleShareItemOpen}>
					<AiOutlineShareAlt size="2rem" cursor="pointer" />
				</ShareIconWrap>
				<ShareItemWrap isOpen={isShareItemOpen}>
					<ShareItem>
						<FaTwitter size="100%" />
					</ShareItem>
					<ShareItem>
						<FaFacebook size="100%" />
					</ShareItem>
					<ShareItem onClick={copyUrl}>
						<ImLink size="100%" />
					</ShareItem>
				</ShareItemWrap>
				<BookmarkWrap>
					{isBookMark ? (
						<BsFillBookmarkFill size="2rem" cursor="pointer" color={color.neon_2} onClick={toggleBookMark} />
					) : (
						<BsBookmark size="2rem" cursor="pointer" color={color.neon_2} onClick={toggleBookMark} />
					)}
				</BookmarkWrap>
			</SubIconWrap>
		</PostLikeOptionBlock>
	);
}

export default React.memo(PostLikeOption);
