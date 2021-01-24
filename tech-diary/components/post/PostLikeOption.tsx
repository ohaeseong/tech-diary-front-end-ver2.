import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AiFillBulb, AiOutlineShareAlt } from 'react-icons/ai';
import { ImLink } from 'react-icons/im';
import { FaComment, FaTwitter, FaFacebook } from 'react-icons/fa';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import { MdArrowDropDown } from 'react-icons/md';

import { color } from 'styles/color';
import { moveLeft, moveDown, moveAngle } from 'styles/animation';
import Button from 'components/common/Button';

const PostLikeOptionBlock = styled.div`
	position: sticky;
	width: 5rem;
	height: 12rem;
	margin-top: 15rem;
	margin-left: -5rem;
	top: 9rem;
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
	justify-content: space-around;
	width: 100%;
	/* border: 1px solid black; */

	margin-bottom: 1rem;
`;

const SubIconWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
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
	width: 2.6rem;
	height: 2.6rem;
	border-radius: 50%;
	padding: 0.01rem;
	background-color: ${(props) => props.theme.white_1};
`;

const EditText = styled.span`
	padding-top: 1rem;
	color: ${(props) => props.theme.gray_5};
	font-family: 'Spoqa Han Sans Thin';
	cursor: pointer;

	&:after {
		content: '';
		display: block;
		width: 100%;
		border-bottom: 1px solid #bcbcbc;
	}
`;

const ShareItem = styled.span`
	position: absolute;
	margin-left: 0.2rem;
	margin-top: 0.2rem;
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
		return null;
	}}
`;

const BookmarkWrap = styled.div`
	display: flex;
	align-items: center;
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
	dispatchForUpdateState: any;

	optionState: OptionState;
	isMine: boolean;
	commentCount: number;
	userIsLike: boolean;
	userIsFollow?: boolean;
	bookMarkToggleValue: boolean;
	shareItemOpenToggleValue: boolean;
};

function PostLikeOption({
	toggleLike,
	toggleBookMark,
	toggleShareItemOpen,
	closeShareItem,
	copyUrl,
	moveToComment,
	dispatchForUpdateState,

	optionState,
	userIsLike,
	isMine,
	commentCount,
	userIsFollow,
	bookMarkToggleValue,
	shareItemOpenToggleValue,
}: Props) {
	const { isLike, likeCount } = optionState;

	useEffect(() => {
		document.body.addEventListener('click', closeShareItem);

		return () => document.body.removeEventListener('click', closeShareItem);
	}, [closeShareItem]);

	useEffect(() => {
		dispatchForUpdateState({
			name: 'isLike',
			value: userIsLike,
		});
	}, [dispatchForUpdateState, userIsLike]);

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
				<ShareItemWrap isOpen={shareItemOpenToggleValue}>
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
					{bookMarkToggleValue ? (
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
