import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { PostLink } from 'store/types/post.types';
import { mediaQuery } from 'components/layout/responsive';
import PostHeadingLinkItem from 'components/post/PostHeadingLinkItem';

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

type HeadingTop = {
	id: string;
	top: number;
};

function PostHeadingLinkList({ linkList }: Props) {
	const [isSticky, setIsSticky] = useState(false);
	const [rerenderTrigger, setRerenderTrigger] = useState(0);
	const [headingTops, setHeadingTops] = useState([] as Array<HeadingTop>);
	const [activeId, setActiveId] = useState('');

	const updateScrollTop = useCallback(() => {
		if (!linkList.length) return;
		const headings = linkList.map(({ id }) => {
			const element = document.getElementById(id);
			if (element === null) {
				setRerenderTrigger(1);
				return null;
			}
			const top = element?.getBoundingClientRect().top;
			return {
				id,
				top,
			};
		});

		setHeadingTops(headings as Array<HeadingTop>);
	}, [linkList]);

	const onScroll = useCallback(() => {
		const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

		if (scrollTop >= 360) {
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}

		const currentHeading = [...headingTops].reverse().find((headingTop) => {
			return scrollTop >= headingTop.top - 4;
		});
		if (!currentHeading) {
			setActiveId('');
			return;
		}

		setActiveId(currentHeading.id);
	}, [headingTops]);

	const changeScrollForLinkItem = (id: string) => {
		const bodyRect = document.body.getBoundingClientRect().top;
		const element = document.getElementById(id);

		const top = element?.offsetTop as number;

		window.scrollTo(0, top);
	};

	useEffect(() => {
		updateScrollTop();
	}, [updateScrollTop, rerenderTrigger]);

	// scroll 이벤트 리스너
	useEffect(() => {
		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [onScroll]);

	return (
		<ListWrap isSticky={isSticky}>
			{linkList.map((item: PostLink) => {
				return (
					<PostHeadingLinkItem
						key={item.id}
						isActive={activeId === item.id}
						linkItem={item}
						onClick={changeScrollForLinkItem}
					/>
				);
			})}
		</ListWrap>
	);
}

export default React.memo(PostHeadingLinkList);
