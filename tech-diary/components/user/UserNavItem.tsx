import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const NavItemWrap = styled.div<{ isActive: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 3rem;
	color: ${(props) => props.theme.gray_4};
	font-family: 'Spoqa Han Sans Thin';
	padding: 0rem 1rem;
	cursor: pointer;
	transition: 0.1s ease-in-out;

	&:hover {
		transition: 0.1s ease-in-out;
		font-weight: 700;
		color: ${(props) => props.theme.neon_2};
	}

	& > * {
		color: ${(props) => props.theme.neon_2};
		margin-right: 0.5rem;
	}

	${(props) => {
		if (props.isActive) {
			return `
                font-weight: 700;
                color: ${props.theme.neon_2};
            `;
		}

		return null;
	}}
`;

type Props = {
	children: ReactNode;

};

function UserNavItem({ children }: Props) {


	return <NavItemWrap isActive>{children}</NavItemWrap>;
}

export default UserNavItem;
