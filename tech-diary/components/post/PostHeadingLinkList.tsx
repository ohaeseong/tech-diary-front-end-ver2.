import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { PostLink } from 'store/types/post.types';
import { mediaQuery } from 'components/layout/responsive';
import PostHeadingLinkItem from './PostHeadingLinkItem';

const ListWrap = styled.div<{ isSticky: boolean }>`
	position: absolute;
	width: 12rem;
	height: 35rem;
	margin-top: 27rem;
	margin-left: 3rem;
	overflow: auto;
	padding-top: 0.5rem;
    padding-left: 0.5rem;

	display: flex;
	flex-direction: column;
	${mediaQuery(1365)} {
		display: none;
	}
	border-top: 2px solid ${(props) => props.theme.neon_2};

	${(props) =>
		props.isSticky &&
		`
	    position: fixed;
        margin-top: 4.5rem;
    `}
`;

type Props = {
	linkList: PostLink[];
};

function PostHeadingLinkList({ linkList }: Props) {
	const [isSticky, setIsSticky] = useState(false);

	const handleListPosttion = useCallback(() => {
		const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

		if (scrollTop >= 360) {
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}
	}, []);

	// scroll 이벤트 리스너
	useEffect(() => {
		window.addEventListener('scroll', handleListPosttion);

		return () => {
			window.removeEventListener('scroll', handleListPosttion);
		};
	}, [handleListPosttion]);

	return (
		<ListWrap isSticky={isSticky}>
			{linkList.map((item: PostLink) => {
				return <PostHeadingLinkItem linkItem={item} />;
			})}
		</ListWrap>
	);
}

export default React.memo(PostHeadingLinkList);
