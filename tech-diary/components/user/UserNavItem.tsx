import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavItemWrap = styled.div<{ selected: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 3rem;
	color: ${(props) => props.theme.gray_4};
	font-family: 'Spoqa Han Sans Thin';
	padding: 0rem 1.5rem;
	cursor: pointer;
	transition: 0.1s ease-in-out;

	&:hover {
		transition: 0.1s ease-in-out;
		font-weight: 700;
		color: ${(props) => props.theme.neon_2};
	}

	& > * {
		margin-right: 0.5rem;
	}

	${(props) => {
		if (props.selected) {
			return `
                font-weight: 700;
                color: ${props.theme.neon_2};
                & > * {
		            color: ${props.theme.neon_2};
		            margin-right: 0.5rem;
	            }
            `;
		}

		return null;
	}}
`;

type Props = {
	children: ReactNode;
	href: string;
	url?: string;
	memberId: string;
};

function UserNavItem({ children, href, memberId, url }: Props) {
	const router = useRouter();
	const selected = router.pathname === href;

	return (
		<>
			<Link href={`/${memberId}/${url}`}>
				<NavItemWrap selected={selected}>{children}</NavItemWrap>
			</Link>
		</>
	);
}

export default React.memo(UserNavItem);
