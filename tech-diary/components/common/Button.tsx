import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { color } from 'styles/color';

const Btn = styled.button<{ size?: string; margin?: string; width?: string; height?: string, color?: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0;
	outline: 0;
	margin: 0.8rem 0.5rem;
	background-color: ${color.gray_5};
	color: ${color.light_purple};
	padding: 0.5rem 1rem;
	transform: 0.3s ease-in-out;
	font-family: 'Spoqa Han Sans';
	cursor: pointer;

	${(props) => {
		if (props.size === 'sm') {
			return css`
				font-size: 0.85rem;
			`;
		}

		if (props.size === 'big') {
			return css`
				font-size: 1.5rem;
			`;
		}

		return css`
			font-size: 1rem;
		`;
	}}

	${(props) =>
		props.width &&
		`
        width: ${props.width};
    `}

    ${(props) =>
		props.height &&
		`
        height: ${props.height};
    `}

    ${(props) =>
		props.margin &&
		`
        margin: ${props.margin};
    `}

	${(props) =>
		props.color &&
		`
        background-color: ${props.color};
    `}
`;

type Props = {
	size?: string;
	margin?: string;
	children: ReactNode;
	width?: string;
	height?: string;
	color?: string;
	onClick?: () => void;
};

function Button({ size = 'default', margin = '', children, width, height, onClick, color }: Props) {
	return (
		<Btn size={size} margin={margin} width={width} height={height} onClick={onClick} color={color}>
			{children}
		</Btn>
	);
}

export default Button;
