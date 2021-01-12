import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { AiFillBulb } from 'react-icons/ai';
import { color } from 'styles/color';

const PostLikeOptionBlock = styled.div`
	position: sticky;
	width: 5rem;
	height: 10rem;
	margin-top: 12rem;
	margin-left: -5rem;
	top: 6rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > AiFillBulb {
		transition: 0.2s ease-in-out;
	}
`;

const LikeCountWrap = styled.span`
	padding: 1rem 0;
	text-align: center;
	width: 100%;

	color: ${props => props.theme.black};
	/* border: 1px solid black; */
`;

type Props = {
	like: number;
	userIsLike?: boolean;
};

function PostLikeOption({ like, userIsLike }: Props) {
	const [isLike, setIsLike] = useState(userIsLike);

	const doOrCancleLike = useCallback(() => {
		if (isLike) {
			setIsLike(false);
		} else {
			setIsLike(true);
		}
	}, [isLike]);

	return (
		<PostLikeOptionBlock>
			{isLike ? (
				<AiFillBulb size="2rem" color={color.star} cursor="pointer" onClick={doOrCancleLike}  />
			) : (
				<AiFillBulb size="2rem" color={color.gray_4} cursor="pointer" onClick={doOrCancleLike} />
			)}
			<LikeCountWrap>{like}</LikeCountWrap>
		</PostLikeOptionBlock>
	);
}

export default React.memo(PostLikeOption);
