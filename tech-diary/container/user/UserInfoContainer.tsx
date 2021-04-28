// import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import isEmail from 'libs/regEx';
// import { NavBar } from 'components/base/NavBar';
import UserProfileInfoTemplate from 'components/user/UserProfileInfoTemplate';
// import useDarkMode from 'libs/hooks/useDarkMode';
import { getStorage } from 'libs/storage';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
// import { color, dark } from 'styles/color';
import { TypeDecoded, UserInfo } from 'store/types/auth.types';
import { Post } from 'store/types/post.types';
import UserNabBar from 'components/user/UserNavBar';
import UserNavItem from 'components/user/UserNavItem';
import UserPostList from 'components/user/UserPostList';
import { RiBookMarkFill } from 'react-icons/ri';
import { BiTimeFive, BiHide } from 'react-icons/bi';
import { IoMdPerson } from 'react-icons/io';
import { HiOutlineBookOpen } from 'react-icons/hi';
import UserProfilePostItem from 'components/user/UserProfilePostItem';
import UserIntroduce from 'components/user/UserIntroduce';
import useToggle from 'libs/hooks/useToggle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRequest from 'libs/hooks/useRequest';
import { requestUserInfoUpdate, requestUserIntroduceUpdate, uploadImage } from 'libs/repository';
import { useDispatch } from 'react-redux';
import { UPDATE_PROFILE_IMAGE } from 'store/modules/auth';

const UserPageTemplate = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	margin-top: 5rem;

	background-color: ${(props) => props.theme.white_1};
`;

const UserPostListTemplate = styled.div`
	max-width: 60rem;
	min-height: 100vh;
`;

const NonePostTemplate = styled.div`
	width: 100%;

	font-size: 1.825rem;
	padding-top: 20rem;
	color: ${(props) => props.theme.gray_4};
	text-align: center;
`;

type Props = {
	userInfo: UserInfo;
	posts: Array<Post>;
	isIntro?: boolean;
};

function UserProfileContainer({ userInfo, posts, isIntro }: Props) {
	const router = useRouter();
	// const [theme, toggleTheme] = useDarkMode();
	const [isMine, setIsMine] = useState(false);
	const [isReadOnly, isReadOnlyToggle] = useToggle(true);
	const [isProfileEdit, isProfileEditToggle] = useToggle(false);
	const dispatch = useDispatch();

	const [, , updateUserInfo, ,] = useRequest(requestUserInfoUpdate);
	const [, , updateUserIntro, ,] = useRequest(requestUserIntroduceUpdate);
	const [, , onUploadImage, ,] = useRequest(uploadImage, true);
	const [introText, setIntroText] = useState(userInfo.introduce || '소개글을 작성해 보세요!');
	const [userEmail, setUserEmail] = useState(userInfo.email);
	const [userName, setUserName] = useState(userInfo.memberName);
	const [userProfileImage, setUserProfileImage] = useState(userInfo.profileImage || '/image/user.png');
	const iconSize = '1.5rem';
	// const themeMode = theme === 'light';

	const onSaveUserInfo = useCallback(async () => {
		const token = getStorage('tech-token') as string;
		const req = {
			introduce: introText,
			token,
		};

		await updateUserIntro(req);

		isReadOnlyToggle();

		const toastMassege = '소개글 수정 성공!';
		toast.success(toastMassege, {
			position: toast.POSITION.TOP_RIGHT,
		});
	}, [introText, isReadOnlyToggle, updateUserIntro]);

	const uploadImageUtil = useCallback(
		async (imageFile: any) => {
			const token = getStorage('tech-token');
			const formData = new FormData();

			if (imageFile) {
				formData.append('image', imageFile[0]);
			}

			const req = {
				formData,
				token,
			};

			const response = await onUploadImage(req);

			return response.data.imgs[0].fileAddress;
		},
		[onUploadImage]
	);

	const handleUserEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setUserEmail(event.target.value);
	}, []);

	const handleUserIntroText = useCallback(
		(value: string) => {
			if (introText.length > 1000 || value.length > 1000) {
				return;
			}
			setIntroText(value);
		},
		[introText.length]
	);

	const handleUserName = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (introText.length > 1000 || event.target.value.length > 50) {
				return;
			}
			setUserName(event.target.value);
		},
		[introText.length]
	);

	const handleProfileImage = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			const imageFile = event.target.files;
			const imageAddress = await uploadImageUtil(imageFile);

			setUserProfileImage(imageAddress);
		},
		[uploadImageUtil]
	);

	const onSubmitUserInfoUpdate = useCallback(async () => {
		const token = getStorage('tech-token') as string;

		if (!isEmail(userEmail) && userEmail) {
			const toastMassege = '이메일 형식이 잘못 되었습니다.';
			toast.error(toastMassege, {
				position: toast.POSITION.TOP_RIGHT,
			});

			return;
		}

		if (!userName) {
			const toastMassege = '이름을 작성해주세요.';
			toast.error(toastMassege, {
				position: toast.POSITION.TOP_RIGHT,
			});

			return;
		}

		if (
			userInfo.email === userEmail &&
			userInfo.memberName === userName &&
			userInfo.profileImage === userProfileImage
		) {
			isProfileEditToggle();
			return;
		}

		const req = {
			email: userEmail,
			memberName: userName,
			profileImage: userProfileImage,
			token,
		};

		await updateUserInfo(req);

		const toastMassege = '유저 정보 수정 성공!';
		toast.success(toastMassege, {
			position: toast.POSITION.TOP_RIGHT,
		});

		dispatch({
			type: UPDATE_PROFILE_IMAGE,
			payload: userProfileImage,
		});
		isProfileEditToggle();
	}, [
		dispatch,
		isProfileEditToggle,
		updateUserInfo,
		userEmail,
		userInfo.email,
		userInfo.memberName,
		userInfo.profileImage,
		userName,
		userProfileImage,
	]);

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		const tokenDecoded = jwt.decode(token) as TypeDecoded;

		if (token) {
			if (tokenDecoded.memberId.toString() === userInfo.memberId) {
				setIsMine(true);
			}
		}

		if (
			!token &&
			(router.pathname === '/[userId]/save' ||
				router.pathname === '/[userId]/private' ||
				router.pathname === '/[userId]/bookmark')
		) {
			router.push(`/${userInfo.memberId}`);
		}
	}, [router, userInfo.memberId, userProfileImage]);

	return (
		<>
			{/* <ThemeProvider theme={themeMode ? dark : color}> */}
			{/* <NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} /> */}
			<UserPageTemplate>
				<UserProfileInfoTemplate
					userInfo={userInfo}
					userName={userName}
					isEditToggle={isProfileEditToggle}
					isEdit={isProfileEdit}
					handleUserEmail={handleUserEmail}
					onSubmitUserInfoUpdate={onSubmitUserInfoUpdate}
					userEmail={userEmail}
					handleUserName={handleUserName}
					isMine={isMine}
					handleProfileImage={handleProfileImage}
					userProfileImage={userProfileImage}
				/>
				<UserPostListTemplate>
					<UserNabBar>
						<UserNavItem href="/[userId]" memberId={userInfo.memberId} url="">
							<HiOutlineBookOpen size={iconSize} /> 게시글
						</UserNavItem>
						<UserNavItem href="/[userId]/introduce" memberId={userInfo.memberId} url="introduce">
							<IoMdPerson size={iconSize} /> 소개글
						</UserNavItem>
						{isMine ? (
							<>
								<UserNavItem href="/[userId]/private" memberId={userInfo.memberId} url="private">
									<BiHide size={iconSize} /> 비공개 게시글
								</UserNavItem>
								<UserNavItem href="/[userId]/save" memberId={userInfo.memberId} url="save">
									<BiTimeFive size={iconSize} /> 임시저장된 게시글
								</UserNavItem>
								<UserNavItem href="/[userId]/bookmark" memberId={userInfo.memberId} url="bookmark">
									<RiBookMarkFill size={iconSize} /> 북마크한 게시글
								</UserNavItem>
							</>
						) : (
							<></>
						)}
					</UserNabBar>

					{!isIntro ? (
						<>
							{posts.length !== 0 ? (
								<UserPostList>
									{posts.map((item: Post) => {
										return <UserProfilePostItem key={item.id} item={item} />;
									})}
								</UserPostList>
							) : (
								<NonePostTemplate>게시글이 없어요!</NonePostTemplate>
							)}
						</>
					) : (
						<UserIntroduce
							introText={introText}
							handleUserIntroText={handleUserIntroText}
							isReadOnly={isReadOnly}
							onSaveUserInfo={onSaveUserInfo}
							isReadOnlyToggle={isReadOnlyToggle}
							isMine={isMine}
						/>
					)}
				</UserPostListTemplate>
			</UserPageTemplate>
			<ToastContainer autoClose={1000} />
			{/* </ThemeProvider> */}
		</>
	);
}

export default UserProfileContainer;
