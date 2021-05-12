import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Input from 'components/common/Input';
import { color } from 'styles/color';
import { css } from '@emotion/react';

const InputWrap = styled.div<{ margin?: string; size?: string; justifyContent?: string }>`
	width: 25rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: ${(props) => props.margin};

	${(props) => {
		if (props.size === 'sm') {
			return css`
				& > input {
					width: 10rem;
					height: 1rem;
				}

				& > span {
					font-size: 1rem;
				}
			`;
		}

		if (props.size === 'regular') {
			return css`
				& > input {
					width: 12rem;
					height: 1rem;
				}

				& > span {
					font-size: 1.2rem;
				}
			`;
		}

		// if (props.size === 'medium') {
		// 	return css`
		// 		font-size: 1.3rem;
		// 	`;
		// }

		// if (props.size === 'big') {
		// 	return css`
		// 		font-size: 1.5rem;
		// 	`;
		// }

		return css`
			font-size: 1rem;
		`;
	}}

	${(props) => props.justifyContent && `justify-content: ${props.justifyContent};`}
`;

const Label = styled.span<{ isFocus: boolean }>`
	font-family: 'Spoqa Han Sans Regular';
	font-size: 1.5rem;
	margin-right: 1rem;
	transition: 0.2s ease-in-out;

	${(props) => {
		if (props.isFocus) {
			return `color: ${color.neon_2}`;
		}
		return `color: ${props.theme.gray_5}`;
	}}
`;

type Props = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	value?: string;
	margin?: string;
	size?: string;
	justifyContent?: string;
	isPassword?: boolean;
	placeholder?: string;
};

function LabelInput({ onChange, placeholder, label, value, margin, size, justifyContent, isPassword }: Props) {
	const [onFocus, setOnFocus] = useState(false);

	const handleFocus = useCallback(() => {
		if (onFocus) {
			setOnFocus(false);
		} else {
			setOnFocus(true);
		}
	}, [onFocus]);

	return (
		<InputWrap margin={margin} size={size} justifyContent={justifyContent}>
			<Label isFocus={onFocus}>{label}</Label>
			<Input
				fontSize={size}
				isPassword={isPassword}
				onChange={onChange}
				placeholder={placeholder}
				handleFocus={handleFocus}
				isFocus={onFocus}
				value={value}
			/>
		</InputWrap>
	);
}

export default LabelInput;
