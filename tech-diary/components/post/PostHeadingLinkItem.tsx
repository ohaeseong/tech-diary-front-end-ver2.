import React from 'react';
import styled from '@emotion/styled';
import { PostLink } from 'store/types/post.types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LinkItemWrap = styled.div`
	margin-top: 0.8rem;
`;

const LinkItem = styled.a`
	font-size: 0.8rem;
	color: ${(props) => props.theme.gray_3};
	cursor: pointer;
	&:hover {
		color: black;
	}
`;

type Props = {
	linkItem: PostLink;
};

function PostHeadingLinkItem({ linkItem }: Props) {
	const router = useRouter();

	return (
		<>
			<LinkItemWrap>
				<Link href="/">
					<LinkItem>
						<LinkItem>{linkItem.title}</LinkItem>
					</LinkItem>
				</Link>
			</LinkItemWrap>
		</>
	);
}

export default PostHeadingLinkItem;
