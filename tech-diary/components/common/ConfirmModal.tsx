import React from 'react';
import styled from '@emotion/styled';
import { toBig } from 'styles/animation';
import { color } from 'styles/color';
import Button from 'components/common/Button';

const ModalTemplate = styled.div`
	position: fixed;
	z-index: 99;
	display: flex;
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

const ModalBox = styled.div`
	width: 30rem;
	height: 15rem;
	background-color: ${(props) => props.theme.white};
	animation: ${toBig} 0.5s;
	border-radius: 5px;
	padding: 0 1rem;
`;

const Head = styled.div`
	text-align: center;
	height: 3rem;
	font-family: 'Spoqa Han Sans Regular';
	color: ${color.neon_2};
	line-height: 3rem;
	font-size: 1.3rem;
	margin-top: 2rem;
	padding-left: 1rem;
`;

const Body = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	height: 10rem;
`;

type Props = {
	modalToggle: () => void;
	acceptFuc: () => void;
	confirmMessage: string;
};

function ConfirmModal({ modalToggle, acceptFuc, confirmMessage }: Props) {
	return (
		<>
			<ModalOver onClick={modalToggle} />
			<ModalTemplate>
				<ModalBox>
					<Head>{confirmMessage}</Head>
					<Body>
						<Button width="11rem" height="3rem" btnColor={color.gray_3} onClick={modalToggle}>
							취소
						</Button>
						<Button width="11rem" height="3rem" btnColor={color.neon_2} onClick={acceptFuc}>
							확인
						</Button>
					</Body>
				</ModalBox>
			</ModalTemplate>
		</>
	);
}

export default ConfirmModal;
