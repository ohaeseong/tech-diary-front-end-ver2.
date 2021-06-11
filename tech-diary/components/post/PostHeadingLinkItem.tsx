import React from 'react';
import styled from '@emotion/styled';
import { PostLink } from 'store/types/post.types';
import Link from 'next/link';

const LinkItemWrap = styled.div`
	margin-top: 0.8rem;
`;

const LinkItem = styled.a`
	font-size: 1rem;
	color: ${(props) => props.theme.gray_3};
	cursor: pointer;
	font-family: 'Spoqa Han Sans Thin';
	&:hover {
		color: black;
	}
`;

type Props = {
	linkItem: PostLink;
	onClick: (id: string) => void;
};

function PostHeadingLinkItem({ linkItem, onClick }: Props) {
	return (
		<>
			<LinkItemWrap>
				<Link href={`${linkItem.url}`}>
					<LinkItem onClick={() => onClick(linkItem.id)}>{linkItem.title}</LinkItem>
				</Link>
			</LinkItemWrap>
		</>
	);
}

export default PostHeadingLinkItem;
