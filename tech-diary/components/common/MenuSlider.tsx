import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

const MenuItemWrap = styled.div<{ height: number }>`
	overflow: hidden;
	width: 8rem;
	background-color: white;
	border: 1px solid ${(props) => props.theme.gray_2};
	transition: 0.3s ease-in-out;
	margin-top: 0.5rem;

	${(props) => {
		if (props.height) {
			return css`
				height: ${props.height};
			`;
		}
		if (props.height === 0) {
			return css`
				transition: 0.3s ease-in-out;
				border: 0px solid ${props.theme.gray_2};
			`;
		}
	}}
`;

type Props = {
	children?: ReactNode;
	height: number;
};

function MenuSlider({ children, height }: Props) {
	return (
		<MenuItemWrap style={{ height }} height={height}>
			{children}
		</MenuItemWrap>
	);
}

export default React.memo(MenuSlider);
