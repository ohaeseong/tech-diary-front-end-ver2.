import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { color } from 'styles/color';

const InputStyled = styled.input<{ size?: string; isFocus?: boolean }>`
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
`;

type Props = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	size?: string;
	isFocus?: boolean;
	value: string;
	handleFocus?: () => void;
};

function Input({ onChange, size = 'default', placeholder, handleFocus, isFocus, value }: Props) {
	return (
		<InputStyled
			onChange={onChange}
			placeholder={placeholder}
			onFocus={handleFocus}
			onBlur={handleFocus}
			value={value}
			isFocus={isFocus}
		/>
	);
}

export default Input;
