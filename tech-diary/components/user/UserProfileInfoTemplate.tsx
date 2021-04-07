import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { UserInfo } from 'store/types/auth.types';
import { color } from 'styles/color';

const UserProfileInfoWrap = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	width: 20rem;
	height: 100vh;
	border-left: 1px solid ${color.gray_1};
	border-right: 1px solid ${color.gray_1};
`;

const UserProfileImage = styled.img`
	width: 15rem;
	height: 15rem;
	border-radius: 50%;
	margin-top: 5rem;
	border: 1px solid ${color.gray_1};
`;

const UserName = styled.div`
	width: 100%;
	margin-top: 4rem;
	padding-left: 6.5rem;
	font-size: 2rem;

	color: ${props => props.theme.black};
`;

const UserSubName = styled.div`
	width: 100%;
	margin-top: 0.8rem;
	padding-left: 6.5rem;
	font-size: 1.2rem;

	color: ${props => props.theme.black};

	font-family: 'Spoqa Han Sans Thin';
`;

type Props = {
	userInfo: UserInfo;
};

function UserProfileInfoTemplate({ userInfo }: Props) {
	return (
		<UserProfileInfoWrap>
			<UserProfileImage src={userInfo.profileImage || '/image/user.png'} alt="profile_image" />
			<UserName>{userInfo.memberName}</UserName>
			<UserSubName>{userInfo.memberId}</UserSubName>
		</UserProfileInfoWrap>
	);
}

export default UserProfileInfoTemplate;
