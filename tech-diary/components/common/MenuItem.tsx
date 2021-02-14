import styled from '@emotion/styled';
import React, { ReactNode, KeyboardEvent } from 'react';

const MenuItemWrap = styled.p`
	width: 100%;
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
	children: string;
	itemInfo?: any;
	onClick?: (params?: any) => void;
	onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
};

function MenuItem({ children, itemInfo, onClick, onKeyDown }: Props) {
	return (
		<MenuItemWrap onClick={() => onClick(itemInfo)} onKeyDown={onKeyDown}>
			{children}
		</MenuItemWrap>
	);
}

export default React.memo(MenuItem);
