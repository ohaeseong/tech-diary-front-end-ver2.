import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { UserInfo } from 'store/types/auth.types';
import { color } from 'styles/color';
import Button from 'components/common/Button';
import { MdEmail } from 'react-icons/md';
import { css } from '@emotion/react';
import { FiUpload } from 'react-icons/fi';

const UserProfileInfoWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 20rem;
	min-height: 100vh;
	margin-right: 2rem;
`;

const ProfileImageWrap = styled.div`
	position: relative;
`;

const UserProfileImage = styled.img`
	width: 15rem;
	height: 15rem;
	border-radius: 50%;
	margin-top: 5rem;
	border: 1px solid ${color.gray_1};
`;

const UserProfileImageUploadInput = styled.input`
	display: none;
`;

const UserProfileImageLabel = styled.label`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	border: 1px solid ${(props) => props.theme.gray_1};
	background-color: ${color.white};
	border-radius: 50%;
	margin-top: 17rem;
	margin-left: 12rem;
	cursor: pointer;

	& > * {
		color: ${color.gray_5};
	}
`;

const UserName = styled.div`
	width: 100%;
	margin-top: 4rem;
	padding-left: 6.5rem;
	font-size: 1.7rem;

	color: ${(props) => props.theme.black};
`;

const UserSubName = styled.div`
	width: 68%;
	margin-top: 0.8rem;
	font-size: 1rem;
	word-break: break-all;
	color: ${(props) => props.theme.black};

	font-family: 'Spoqa Han Sans Thin';
`;

const InfoWrap = styled.div`
	width: 68%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	margin-top: 2rem;

	& > * {
		color: ${(props) => props.theme.gray_4};
	}
`;

const InfoUpdateInput = styled.input<{ type?: string }>`
	font-size: 0.8rem;
	font-family: 'Spoqa Han Sans Thin';

	border: 1px solid ${(props) => props.theme.gray_2};
	padding: 0.5rem;
	border-radius: 7px;
	margin-left: 1.5rem;
	background-color: ${(props) => props.theme.white};

	${(props) => {
		if (props.type === 'name') {
			return css`
				width: 70%;
				color: ${props.theme.black};
				font-size: 1rem;
				font-family: 'Spoqa Han Sans Thin';
				word-break: break-all;
				margin-top: 1rem;
			`;
		}

		return '';
	}}
`;

const InfoContents = styled.span`
	max-width: 100%;
	font-size: 1rem;
	font-family: 'Spoqa Han Sans Thin';
	margin-left: 1.5rem;
	word-break: break-all;
`;

type Props = {
	userInfo: UserInfo;
	isEdit: boolean;
	userEmail: string;
	userName: string;
	isMine: boolean;
	userProfileImage: string;
	isEditToggle: () => void;
	handleUserEmail: (event: ChangeEvent<HTMLInputElement>) => void;
	handleUserName: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmitUserInfoUpdate: () => void;
	handleProfileImage: (event: ChangeEvent<HTMLInputElement>) => void;
};

function UserProfileInfoTemplate({
	userInfo,
	isEdit,
	userEmail,
	userName,
	isMine,
	userProfileImage,
	isEditToggle,
	handleUserEmail,
	onSubmitUserInfoUpdate,
	handleUserName,
	handleProfileImage,
}: Props) {
	return (
		<UserProfileInfoWrap>
			<ProfileImageWrap>
				{isEdit ? (
					<>
						<UserProfileImageLabel htmlFor="profile_image_upload">
							<FiUpload />
						</UserProfileImageLabel>
						<UserProfileImageUploadInput
							id="profile_image_upload"
							type="file"
							multiple={false}
							onChange={handleProfileImage}
							accept="image/gif, image/jpeg, image/jpg, image/png"
						/>
					</>
				) : (
					<></>
				)}
				<UserProfileImage src={userProfileImage} alt="profile_image" />
			</ProfileImageWrap>
			<UserName>{userInfo.memberId}</UserName>
			{isEdit ? (
				<InfoUpdateInput onChange={handleUserName} value={userName} type="name" />
			) : (
				<UserSubName>{userName}</UserSubName>
			)}
			<InfoWrap>
				{userEmail || isEdit ? (
					<>
						<MdEmail size="1.5rem" />
						{isEdit ? (
							<InfoUpdateInput onChange={handleUserEmail} value={userEmail} />
						) : (
							<InfoContents>{userEmail}</InfoContents>
						)}
					</>
				) : (
					<></>
				)}
			</InfoWrap>
			{isMine ? (
				<>
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
						<Button
							width="70%"
							height="2.5rem"
							margin="3rem 0rem 0rem 0rem"
							btnColor={color.gray_4}
							onClick={isEditToggle}
						>
							프로필 수정
						</Button>
					)}
				</>
			) : (
				<></>
			)}
		</UserProfileInfoWrap>
	);
}

export default React.memo(UserProfileInfoTemplate);
