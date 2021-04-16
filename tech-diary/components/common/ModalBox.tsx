import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { toBig } from 'styles/animation';
import { color } from 'styles/color';

const ModalTemplate = styled.div`
	position: absolute;
	z-index: 99;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const ModalOver = styled.div`
	position: absolute;
	z-index: 98;
	opacity: 0.6;
	width: 100%;
	height: 100%;
	background-color: ${color.gray_0};
`;

const BoxWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 25rem;
	min-height: 15rem;
	background-color: ${color.white};
	animation: ${toBig} 0.5s;
	border-radius: 5px;
	padding: 0 1rem;
	box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.12);
`;

type Props = {
	children: ReactNode;
};

function ModalBox({ children }: Props) {
	return (
		<>
			<ModalOver />
			<ModalTemplate>
				<BoxWrap>{children}</BoxWrap>
			</ModalTemplate>
		</>
	);
}

export default ModalBox;
