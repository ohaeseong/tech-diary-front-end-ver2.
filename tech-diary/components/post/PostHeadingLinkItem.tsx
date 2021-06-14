import React from 'react';
import styled from '@emotion/styled';
import { PostLink } from 'store/types/post.types';
import Link from 'next/link';

const LinkItemWrap = styled.div<{ marginLeft: number }>`
	margin-top: 0.8rem;
	/* margin-left: 1rem; */
	${(props) =>
		props.marginLeft &&
		`
        margin-left: ${props.marginLeft}px;
    `}
`;

const LinkItem = styled.a<{ isActive: boolean }>`
	font-size: 0.9rem;
	color: ${(props) => props.theme.gray_3};
	cursor: pointer;
	/* font-family: 'Spoqa Han Sans Thin'; */
	${(props) =>
		props.isActive &&
		`
		color: black;
    `}
	&:hover {
		color: black;
	}
`;

type Props = {
	linkItem: PostLink;
	isActive: boolean;
	onClick: (id: string) => void;
};

function PostHeadingLinkItem({ linkItem, onClick, isActive }: Props) {
	return (
		<>
			<Link href={`${linkItem.url}`}>
				<LinkItemWrap marginLeft={linkItem.level * 12}>
					<LinkItem onClick={() => onClick(linkItem.id)} isActive={isActive}>
						{linkItem.title}
					</LinkItem>
				</LinkItemWrap>
			</Link>
		</>
	);
}

export default PostHeadingLinkItem;
