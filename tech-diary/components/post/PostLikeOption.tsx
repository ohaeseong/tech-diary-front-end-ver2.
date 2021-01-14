import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { AiFillBulb, AiOutlineShareAlt } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import { color } from 'styles/color';
import { fadein, moveToTop } from 'styles/animation';
import Button from 'components/common/Button';

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

const AnimationWrap = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	/* border: 1px solid; black; */
	& > * {
		animation-iteration-count: infinite;
		transition: 0.2s ease-in-out;
	}
`;

const ItemWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
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
	/* margin: 1rem 0; */
	text-align: center;
	width: 100%;

	color: ${(props) => props.theme.gray_4};
`;

type Props = {
	like: number;
	commentCount: number;
	userIsLike?: boolean;
	userIsBookMark?: boolean;
};

function PostLikeOption({ like, userIsLike, commentCount, userIsBookMark }: Props) {
	const [isLike, setIsLike] = useState(userIsLike);
	const [isBookMark, setIsBookMark] = useState(userIsBookMark);

	const toggleLike = useCallback(() => {
		if (isLike) {
			setIsLike(false);
		} else {
			setIsLike(true);
		}
	}, [isLike]);

	const toggleBookMark = useCallback(() => {
		if (isBookMark) {
			setIsBookMark(false);
		} else {
			setIsBookMark(true);
		}
	}, [isBookMark]);

	const moveToComment = () => {
		if (document.querySelector('body')) {
			const location = document.querySelector('body')?.clientHeight;
			window.scrollTo({ top: location, left: 0, behavior: 'smooth' });
		}
	};

	return (
		<PostLikeOptionBlock>
			<ItemWrap>
				{isLike ? (
					<AnimationWrap>
						<AiFillBulb size="1.7rem" color={color.star} cursor="pointer" onClick={toggleLike} />
					</AnimationWrap>
				) : (
					<AnimationWrap>
						<AiFillBulb size="1.7rem" color={color.gray_4} cursor="pointer" onClick={toggleLike} />
					</AnimationWrap>
				)}
				<CountWrap>{like}</CountWrap>
			</ItemWrap>
			<ItemWrap>
				<AnimationWrap>
					<FaComment size="1.2rem" color="#4f95ef" cursor="pointer" onClick={moveToComment} />
				</AnimationWrap>
				<CountWrap>{commentCount}</CountWrap>
			</ItemWrap>
			<FollowWrap>
				<Button size="sm" margin="0" color={color.neon_2} height="1.8rem">
					Follow
				</Button>
			</FollowWrap>
			<SubIconWrap>
				<AiOutlineShareAlt size="1.7rem" cursor="pointer" />
				{isBookMark ? (
					<BsFillBookmarkFill size="1.7rem" cursor="pointer" color={color.neon_2} onClick={toggleBookMark} />
				) : (
					<BsBookmark size="1.7rem" cursor="pointer" color={color.neon_2} onClick={toggleBookMark} />
				)}
			</SubIconWrap>
		</PostLikeOptionBlock>
	);
}

export default React.memo(PostLikeOption);
