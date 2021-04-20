import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { color } from 'styles/color';
import { css } from '@emotion/react';

const InputStyled = styled.input<{ fontSize?: string; isFocus?: boolean }>`
	width: 15rem;
	height: 2rem;

	padding: 0.5rem;
	transition: 0.2s ease-in-out;
	font-family: 'Spoqa Han Sans Regular';
	font-size: 1.32em;

	border-radius: 5px;
	color: ${color.gray_5};

	outline: 0;
	border: 1px solid ${color.gray_2};

	${(props) => {
		if (props.isFocus) {
			return `
                border: 1px solid ${color.neon_2};
                color: ${color.neon_2};
            `;
		}

		return '';
	}}

	${(props) => {
		if (props.fontSize === 'sm') {
			return css`
				font-size: 0.7rem;
			`;
		}

		if (props.fontSize === 'regular') {
			return css`
				font-size: 1rem;
			`;
		}

		if (props.fontSize === 'medium') {
			return css`
				font-size: 1.3rem;
			`;
		}

		if (props.fontSize === 'big') {
			return css`
				font-size: 1.5rem;
			`;
		}

		return '';
	}}
`;

type Props = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	isFocus?: boolean;
	value?: string;
	fontSize?: string;
	handleFocus?: () => void;
};

function Input({ onChange, placeholder, handleFocus, isFocus, value, fontSize }: Props) {
	return (
		<InputStyled
			onChange={onChange}
			placeholder={placeholder}
			onFocus={handleFocus}
			onBlur={handleFocus}
			fontSize={fontSize}
			value={value || ''}
			isFocus={isFocus}
		/>
	);
}

export default Input;
