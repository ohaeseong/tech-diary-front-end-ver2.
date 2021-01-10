import styled from '@emotion/styled';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import { color } from 'styles/color';

const LinkWrap = styled.a<{ isScroll: boolean; isMain?: boolean }>`
	display: block;
	font-size: 1rem;
	padding: 2rem 1rem;
	font-family: 'Spoqa Han Sans';
	color: ${color.gray_0};
	cursor: pointer;
	margin-left: 1.5rem;
	transition: 0.3s ease-in-out;

	&:hover {
		transition: 0.3s ease-in-out;
		color: ${(props) => props.theme.white};

		${(props) =>
			props.isScroll
				? `
            color: ${props.theme.gray_3};
        `
				: `
            color: ${props.theme.gray_2};
        `}
	}

	${(props) =>
		props.isScroll &&
		`
        color: ${props.theme.black};
	`}

	${(props) =>
		props.isMain === false &&
		`
        color: ${props.theme.black};
    `}
`;

type Props = {
	href: string;
	children: ReactNode | string;
	isScroll: boolean;
	isMain?: boolean;
};

function NavBarItem({ href, children, isScroll, isMain }: Props) {
	return (
		<Link href={href}>
			<LinkWrap isScroll={isScroll} isMain={isMain}>
				{children}
			</LinkWrap>
		</Link>
	);
}

export default NavBarItem;
