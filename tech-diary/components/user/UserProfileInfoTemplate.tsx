import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { UserInfo } from 'store/types/auth.types';
import { color } from 'styles/color';
import Button from 'components/common/Button';
import { MdEmail } from 'react-icons/md';
import { css } from '@emotion/react';
import { FiUpload, FiUsers } from 'react-icons/fi';
import Link from 'next/link';
import { mediaQuery } from 'components/layout/responsive';
// import Image from 'next/image';

const UserProfileInfoWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 17rem;
	min-height: 100vh;
	margin-right: 2rem;

	${mediaQuery(768)} {
		flex-direction: row;
		width: 100%;
		min-height: 15rem;
	}
`;

const ProfileImageWrap = styled.div`
	position: relative;
`;

const UserProfileImage = styled.img`
	width: 15rem;
	height: 15rem;
	border-radius: 50%;
	border: 1px solid ${color.gray_1};
	margin-top: 5rem;
	object-fit: cover;

	${mediaQuery(768)} {
		width: 5rem;
		height: 5rem;
		margin-left: 2rem;
	}
`;

const ButtonWrap = styled.div`
	${mediaQuery(768)} {
		display: none;
	}
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

	${mediaQuery(768)} {
		width: 1.5rem;
		height: 1.5rem;
		margin-top: 9rem;
		margin-left: 5.5rem;
	}

	& > * {
		color: ${color.gray_5};
	}
`;

const NameWrap = styled.div`
	display: flex;
	flex-direction: column;

	${mediaQuery(768)} {
		margin-top: 2rem;
		margin-left: 1rem;
		height: 5rem;
	}
`;

const UserName = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-top: 4rem;
	font-size: 1.7rem;

	color: ${(props) => props.theme.black};

	cursor: pointer;
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
	flex-direction: column;
	margin-top: 3rem;

	${mediaQuery(768)} {
		display: none;
	}
`;

const EmailInputWrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
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

const FollowWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
	color: ${(props) => props.theme.gray_6};
	font-family: 'Spoqa Han Sans Medium';
	font-size: 0.8rem;
	& > * {
		font-size: 0.8rem;
	}

	& > div {
		cursor: pointer;
	}
`;

const InfoContents = styled.span`
	max-width: 100%;
	font-size: 0.8rem;
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
	userProfileImage?: string;
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
				{isMine ? (
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
			<NameWrap>
				<Link href={`/${userInfo.memberId}`}>
					<UserName>{userInfo.memberId}</UserName>
				</Link>
				{isEdit ? (
					<InfoUpdateInput onChange={handleUserName} value={userName} type="name" />
				) : (
					<UserSubName>{userName}</UserSubName>
				)}
			</NameWrap>
			<InfoWrap>
				<FollowWrap>
					<FiUsers size="1rem" />
					<Link href={`/${userInfo.memberId}/followers`}>
						<div>{userInfo.followers} followers</div>
					</Link>{' '}
					•
					<Link href={`/${userInfo.memberId}/followings`}>
						<div>{userInfo.followings} followings</div>
					</Link>
				</FollowWrap>
				{userEmail || isEdit ? (
					<EmailInputWrap>
						<MdEmail size="1.5rem" />
						{isEdit ? (
							<InfoUpdateInput value={userEmail || ''} onChange={handleUserEmail} />
						) : (
							<InfoContents>{userEmail}</InfoContents>
						)}
					</EmailInputWrap>
				) : (
					<></>
				)}
			</InfoWrap>
			<ButtonWrap>
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
			</ButtonWrap>
		</UserProfileInfoWrap>
	);
}

export default React.memo(UserProfileInfoTemplate);
