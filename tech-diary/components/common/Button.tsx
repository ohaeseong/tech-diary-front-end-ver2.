import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { color } from 'styles/color';

const Btn = styled.button<{
	size?: string;
	margin?: string;
	width?: string;
	height?: string;
	color?: string;
	fontSize?: string;
	border?: string;
	fontColor?: string;
}>`
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
	cursor: pointer;
	border-radius: 5px;

	${(props) => {
		if (props.size === 'sm') {
			return css`
				font-size: 0.85rem;
			`;
		}

		if (props.size === 'regular') {
			return css`
				font-size: 1rem;
			`;
		}

		if (props.size === 'medium') {
			return css`
				font-size: 1.3rem;
			`;
		}

		if (props.size === 'big') {
			return css`
				font-size: 1.5rem;
			`;
		}

		return css`
			font-size: ${props.fontSize};
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

	${(props) =>
		props.border &&
		`
        border: ${props.border};
	`}

	${(props) =>
		props.fontColor &&
		`
        color: ${props.fontColor};
	`}
	
	& > * {
		margin-left: 0.4rem;
	}
`;

type Props = {
	size?: string;
	margin?: string;
	children: ReactNode;
	width?: string;
	height?: string;
	btnColor?: string;
	fontSize?: string;
	border?: string;
	fontColor?: string;
	onClick?: (params?: any) => void;
};

function Button({
	size = 'default',
	margin = '',
	children,
	width,
	height,
	onClick,
	btnColor,
	fontColor,
	fontSize,
	border,
}: Props) {
	return (
		<Btn
			size={size}
			margin={margin}
			width={width}
			height={height}
			onClick={onClick}
			color={btnColor}
			fontSize={fontSize}
			border={border}
			fontColor={fontColor}
		>
			{children}
		</Btn>
	);
}

export default React.memo(Button);
