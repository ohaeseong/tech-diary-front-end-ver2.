import React from 'react';
import styled from '@emotion/styled';
import { GoX } from 'react-icons/go';
import ModalBox from 'components/common/ModalBox';
import { color } from 'styles/color';

const ModalContentsWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 50rem;
	height: 30rem;

	/* border: 1px solid black; */
`;

const Head = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-top: 1rem;

	& > * {
		color: ${color.gray_4};
		cursor: pointer;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	border: 1px solid black;
`;

// const Bottom = styled.div`
// 	border: 1px solid black;
// `;

function UserEditProfileModal() {
	return (
		<ModalBox>
			<ModalContentsWrap>
				<Head>
					<GoX size="1.5rem" />
				</Head>
				<Body />
			</ModalContentsWrap>
		</ModalBox>
	);
}

export default UserEditProfileModal;
