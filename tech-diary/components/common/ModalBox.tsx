import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { toBig } from 'styles/animation';
import { color } from 'styles/color';

const ModalTemplate = styled.div`
	position: fixed;
	z-index: 99;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const ModalOver = styled.div`
	position: fixed;
	z-index: 98;
	opacity: 0.6;
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.gray_0};
`;

const BoxWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-width: 25rem;
	min-height: 15rem;
	background-color: ${(props) => props.theme.white};
	animation: ${toBig} 0.5s;
	border-radius: 5px;
	padding: 0 1rem;
	box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.12);
`;

const Message = styled.p<{ isError?: boolean }>`
	text-align: center;
	width: 100%;
	height: 2rem;
	line-height: 2rem;
	font-family: 'Spoqa Han Sans Thin';
	color: ${color.neon_2};

	${(props) => props.isError && `color: ${color.neon_1}`};
`;

type Props = {
	children: ReactNode;
	msg?: {
		isError?: boolean;
		message: string;
	};
};

function ModalBox({ children, msg }: Props) {
	return (
		<>
			<ModalOver />
			<ModalTemplate>
				<BoxWrap>
					{msg ? <Message isError={msg?.isError}>{msg?.message}</Message> : <></>}
					{children}
				</BoxWrap>
			</ModalTemplate>
		</>
	);
}

export default ModalBox;
