import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import { color } from 'styles/color';

const MenuItemWrap = styled.p`
	width: 100%;

	margin: 0;
	height: 30px;
	padding-left: 10px;
	background-color: ${(props) => props.theme.white};

	font-size: 0.8rem;
	line-height: 2rem;

	color: ${(props) => props.theme.black};

	&:hover {
		cursor: pointer;
	}
`;

type Props = {
	children: ReactNode;
	onClick?: () => void;
};

function MenuItem({ children, onClick }: Props) {
	return <MenuItemWrap onClick={onClick}>{children}</MenuItemWrap>;
}

export default MenuItem;
