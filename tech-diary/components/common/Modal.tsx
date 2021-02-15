import React from 'react';
import styled from '@emotion/styled';
import { toBig } from 'styles/animation';
import { GoX } from 'react-icons/go';
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
	opacity: 0.3;
	width: 100%;
	height: 100%;
	background-color: black;
`;

const ModalBox = styled.div<{ size: string }>`
	width: 40rem;
	height: 30rem;
	background-color: white;
	animation: ${toBig} 2s;
	border-radius: 5px;
`;

const Head = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	width: 100%;
	height: 2rem;
	/* border: 1px solid black; */
	& > * {
		margin-right: 0.7rem;
		cursor: pointer;
	}
`;

const Body = styled.div`
	width: 100%;
	height: 18rem;
	/* border: 1px solid black; */
`;

type Props = {
	size: string;
};

function Modal({ size = 'default' }: Props) {
	return (
		<>
			<ModalOver />
			<ModalTemplate>
				<ModalBox size={size} >
					<Head>
						<GoX size="1.5rem" color={color.gray_5} />
					</Head>
					<Body />
				</ModalBox>
			</ModalTemplate>
		</>
	);
}

export default Modal;
