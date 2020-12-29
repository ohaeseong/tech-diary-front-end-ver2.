import styled from '@emotion/styled';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import { color } from 'styles/color';

const LinkWrap = styled.a<{ isScroll: boolean }>`
	display: block;
	font-size: 1rem;
	padding: 2rem 1rem;
	font-family: 'Spoqa Han Sans';
	color: ${color.gray_1};
	cursor: pointer;
	margin-left: 1.5rem;
	transition: 0.3s ease-in-out;

	${(props) =>
		props.isScroll &&
		`
        color: ${color.black};
    `}

	&:hover {
		transition: 0.3s ease-in-out;
		color: ${color.white};

		${(props) =>
			props.isScroll
				? `
            color: ${color.gray_3};
        `
				: `
            color: ${color.gray_2};
        `}
	}
`;

type Props = {
	href: string;
	children: ReactNode | string;
	isScroll: boolean;
};

function NavBarItem({ href, children, isScroll }: Props) {
	return (
		<Link href={href}>
			<LinkWrap isScroll={isScroll}>{children}</LinkWrap>
		</Link>
	);
}

export default NavBarItem;
