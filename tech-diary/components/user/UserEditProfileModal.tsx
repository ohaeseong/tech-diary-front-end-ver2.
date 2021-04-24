import React from 'react';
import styled from '@emotion/styled';
import ModalBox from 'components/common/ModalBox';

const ModalContentsWrap = styled.div`
	width: 60rem;
	height: 40rem;

	border: 1px solid black;
`;

function UserEditProfileModal() {
	return (
		<ModalBox>
			<ModalContentsWrap />
		</ModalBox>
	);
}

export default UserEditProfileModal;
