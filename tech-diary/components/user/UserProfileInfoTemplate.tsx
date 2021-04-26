import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { UserInfo } from 'store/types/auth.types';
import { color } from 'styles/color';
import Button from 'components/common/Button';
import { MdEmail } from 'react-icons/md';

const UserProfileInfoWrap = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	width: 20rem;
	min-height: 100vh;
	margin-right: 2rem;
	/* border-left: 1px solid ${color.gray_1};
	border-right: 1px solid ${color.gray_1}; */
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
	font-size: 1.7rem;

	color: ${(props) => props.theme.black};
`;

const UserSubName = styled.div`
	width: 100%;
	margin-top: 0.8rem;
	padding-left: 6.5rem;
	font-size: 1rem;

	color: ${(props) => props.theme.black};

	font-family: 'Spoqa Han Sans Thin';
`;

const InfoWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 1rem;
	margin-top: 2rem;

	& > * {
		color: ${(props) => props.theme.gray_5};
	}
`;

const InfoUpdateInput = styled.input`
	font-size: 1rem;
	font-family: 'Spoqa Han Sans Thin';

	border: 1px solid ${(props) => props.theme.gray_2};
	/* padding: 0.2rem; */
	border-radius: 2px;
	margin-left: 1.5rem;
`;

const InfoContents = styled.span`
	font-size: 1rem;
	font-family: 'Spoqa Han Sans Thin';

	margin-left: 1.5rem;
`;

type Props = {
	userInfo: UserInfo;
	isEdit: boolean;
	userEmail: string;
	isEditToggle: () => void;
	handleUserEmail: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmitUserInfoUpdate: () => void;
};

function UserProfileInfoTemplate({
	userInfo,
	isEdit,
	userEmail,
	isEditToggle,
	handleUserEmail,
	onSubmitUserInfoUpdate,
}: Props) {
	return (
		<UserProfileInfoWrap>
			<UserProfileImage src={userInfo.profileImage || '/image/user.png'} alt="profile_image" />
			<UserName>{userInfo.memberName}</UserName>
			<UserSubName>{userInfo.memberId}</UserSubName>
			<InfoWrap>
				<MdEmail size="1.5rem" />
				{isEdit ? (
					<InfoUpdateInput onChange={handleUserEmail} value={userEmail} />
				) : (
					<InfoContents>{userInfo.email}</InfoContents>
				)}
			</InfoWrap>
			{isEdit ? (
				<Button
					width="70%"
					height="2.5rem"
					margin="3rem 0rem 0rem 0rem"
					btnColor={color.gray_4}
					onClick={onSubmitUserInfoUpdate}
				>
					프로필 저장
				</Button>
			) : (
				<Button width="70%" height="2.5rem" margin="3rem 0rem 0rem 0rem" btnColor={color.gray_4} onClick={isEditToggle}>
					프로필 수정
				</Button>
			)}
		</UserProfileInfoWrap>
	);
}

export default UserProfileInfoTemplate;
