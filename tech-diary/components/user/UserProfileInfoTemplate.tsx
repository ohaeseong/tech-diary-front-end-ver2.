import React from 'react';
import styled from '@emotion/styled';

const UserProfileInfoWrap = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	width: 20rem;
	height: 100vh;
	border: 1px solid black;
`;

const UserProfileImage = styled.img`
	width: 14rem;
	height: 14rem;
	border-radius: 50%;
	margin-top: 5rem;
	border: 1px solid black;
`;

function UserProfileInfoTemplate() {
	return (
		<UserProfileInfoWrap>
			<UserProfileImage />
		</UserProfileInfoWrap>
	);
}

export default UserProfileInfoTemplate;
