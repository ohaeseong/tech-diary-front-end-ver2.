import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Input from 'components/common/Input';
import { color } from 'styles/color';

const InputWrap = styled.div`
	width: 25rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 2rem;
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
		return `color: ${color.gray_5}`;
	}}
`;

type Props = {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	value: string;
	placeholder?: string;
};

function LabelInput({ onChange, placeholder, label, value }: Props) {
	const [onFocus, setOnFocus] = useState(false);

	const handleFocus = useCallback(() => {
		if (onFocus) {
			setOnFocus(false);
		} else {
			setOnFocus(true);
		}
	}, [onFocus]);

	return (
		<InputWrap>
			<Label isFocus={onFocus}>{label}</Label>
			<Input onChange={onChange} placeholder={placeholder} handleFocus={handleFocus} isFocus={onFocus} value={value} />
		</InputWrap>
	);
}

export default LabelInput;
