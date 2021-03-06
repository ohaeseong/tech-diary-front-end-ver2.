import styled from '@emotion/styled';
import { mediaQuery } from 'components/layout/responsive';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import { color } from 'styles/color';

const LinkWrap = styled.a<{ isScroll: boolean; isMain?: boolean; type?: string }>`
	display: block;
	padding: 2rem 1rem;
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
		props.isMain === false &&
		`
        color: ${props.theme.black};
    `}

	${(props) =>
		props.isScroll &&
		`
        color: ${props.theme.black};
	`}

	${mediaQuery(768)} {
		padding: 0rem;
		font-size: 0.8rem;
		color: ${(props) => props.theme.black};
	}
`;

type Props = {
	url: string;
	children: ReactNode | string;
	isScroll: boolean;
	isMain?: boolean;
	type?: string;
};

function NavBarItem({ url, children, isScroll, isMain, type }: Props) {
	return (
		<Link href={url}>
			<LinkWrap isScroll={isScroll} isMain={isMain} type={type}>
				{children}
			</LinkWrap>
		</Link>
	);
}

export default React.memo(NavBarItem);
