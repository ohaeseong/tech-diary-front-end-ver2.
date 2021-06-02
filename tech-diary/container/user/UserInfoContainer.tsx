import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import isEmail from 'libs/regEx';
import UserProfileInfoTemplate from 'components/user/UserProfileInfoTemplate';
import { getStorage, setStorage } from 'libs/storage';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { TypeDecoded, UserInfo } from 'store/types/auth.types';
import { FollowInfo, Post } from 'store/types/post.types';
import UserNabBar from 'components/user/UserNavBar';
import UserNavItem from 'components/user/UserNavItem';
import InventoryPostList from 'components/post/InventoryPostList';
import { RiBookMarkFill } from 'react-icons/ri';
import { BiTimeFive, BiHide } from 'react-icons/bi';
import { IoMdPerson } from 'react-icons/io';
import { HiOutlineBookOpen } from 'react-icons/hi';
import InventoryPostItem from 'components/post/InventoryPostItem';
import UserIntroduce from 'components/user/UserIntroduce';
import useToggle from 'libs/hooks/useToggle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRequest from 'libs/hooks/useRequest';
import {
	requestUserInfoUpdate,
	requestUserIntroduceUpdate,
	uploadImage,
	requestSearchMemberPosts,
} from 'libs/repository';
import { useDispatch } from 'react-redux';
import { UPDATE_PROFILE_IMAGE } from 'store/modules/auth';
import Input from 'components/common/Input';
import { color } from 'styles/color';
import FollowList from 'components/user/FollowList';
import FollowItem from 'components/user/FollowItem';
import { mediaQuery } from 'components/layout/responsive';

const UserPageTemplate = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	margin-top: 5rem;

	background-color: ${(props) => props.theme.white_1};

	${mediaQuery(768)} {
		flex-direction: column;
	}
`;

const SearchInputTemplate = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;

	& > * {
		margin-left: 0.5rem;
	}
	${mediaQuery(768)} {
		& > * {
			margin-right: 1rem;
		}
	}
`;

const InventoryPostListTemplate = styled.div`
	max-width: 60rem;
	min-height: 100vh;

	${mediaQuery(768)} {
		margin-left: 1.5rem;
	}
`;

const NonePostTemplate = styled.div`
	width: 50rem;

	font-size: 1.825rem;
	padding-top: 20rem;
	color: ${(props) => props.theme.gray_4};
	text-align: center;

	${mediaQuery(767)} {
		width: 80%;
	}
`;

type Props = {
	userInfo: UserInfo;
	posts: Array<Post>;
	isIntro?: boolean;
	isSocial?: boolean;
	isFollowers?: boolean;
	memberList?: FollowInfo[];
};

function UserProfileContainer({ userInfo, posts, isIntro, memberList, isSocial, isFollowers }: Props) {
	const router = useRouter();
	// const [theme, toggleTheme] = useDarkMode();
	const [isMine, setIsMine] = useState(false);
	const [searchWord, setSearchWord] = useState('');
	const [isReadOnly, isReadOnlyToggle] = useToggle(true);
	const [isProfileEdit, isProfileEditToggle] = useToggle(false);
	const [followList, setFollowList] = useState(memberList);
	const dispatch = useDispatch();

	const [, , updateUserInfo, ,] = useRequest(requestUserInfoUpdate);
	const [, , updateUserIntro, ,] = useRequest(requestUserIntroduceUpdate);
	const [searchPosts, , searchMemberPosts, ,] = useRequest(requestSearchMemberPosts, true);
	const [, , onUploadImage, ,] = useRequest(uploadImage, true);
	const [introText, setIntroText] = useState(userInfo.introduce || '소개글을 작성해 보세요!');
	const [userEmail, setUserEmail] = useState(userInfo.displayEmail);
	const [userName, setUserName] = useState(userInfo.memberName);
	const [profileImage, setProfileImage] = useState(userInfo.profileImage);
	const [userPosts, setUserPosts] = useState(posts || []);
	const iconSize = '1.5rem';

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

	const handleSearchWord = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			setSearchWord(event.target.value);

			const req = {
				memberId: userInfo.memberId,
				searchWord: event.target.value,
			};
			await searchMemberPosts(req);
		},
		[searchMemberPosts, userInfo.memberId]
	);

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
			const token = getStorage('tech-token') as string;
			const userStorageInfo = getStorage('user-info') as UserInfo;

			const req = {
				profileImage: imageAddress,
				token,
			};

			await updateUserInfo(req);
			setProfileImage(imageAddress);
			dispatch({
				type: UPDATE_PROFILE_IMAGE,
				payload: imageAddress,
			});
			const newUserInfo = {
				...userStorageInfo,
			};

			newUserInfo.profileImage = imageAddress;
			setStorage('user-info', newUserInfo);
		},
		[dispatch, updateUserInfo, uploadImageUtil]
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

		if (userInfo.email === userEmail && userInfo.memberName === userName) {
			isProfileEditToggle();
			return;
		}

		const req = {
			email: userEmail,
			memberName: userName,
			token,
		};

		await updateUserInfo(req);

		const toastMassege = '유저 정보 수정 성공!';
		toast.success(toastMassege, {
			position: toast.POSITION.TOP_RIGHT,
		});

		isProfileEditToggle();
	}, [isProfileEditToggle, updateUserInfo, userEmail, userInfo.email, userInfo.memberName, userName]);

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
	}, [router, userInfo.memberId]);

	useEffect(() => {
		if (userInfo.profileImage) {
			setProfileImage(userInfo.profileImage as string);
		} else {
			setProfileImage('/static/user.png');
		}
	}, [userInfo]);

	useEffect(() => {
		if (!searchWord) {
			setUserPosts(posts);
		} else if (searchPosts) {
			setUserPosts(searchPosts.data.posts);
		}
	}, [posts, searchPosts, searchWord]);

	return (
		<>
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
					userProfileImage={profileImage}
				/>
				<InventoryPostListTemplate>
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

					{isSocial ? (
						<FollowList>
							{followList?.length !== 0 ? (
								<>
									{followList?.map((item: FollowInfo) => {
										return (
											<FollowItem
												key={item.idx}
												item={item}
												isFollowers={isFollowers || false}
												setFollowList={setFollowList}
											/>
										);
									})}
								</>
							) : (
								<NonePostTemplate>팔로우 활동을 시작해보세요!</NonePostTemplate>
							)}
						</FollowList>
					) : (
						<>
							{!isIntro ? (
								<>
									{router.pathname === '/[userId]' ? (
										<SearchInputTemplate>
											<AiOutlineSearch size="1.5rem" color={color.gray_3} />
											<Input
												value={searchWord}
												onChange={handleSearchWord}
												fontSize="sm"
												width="10rem"
												height="1rem"
												placeholder="게시글 검색.."
											/>
										</SearchInputTemplate>
									) : (
										<></>
									)}
									{userPosts.length !== 0 ? (
										<>
											<InventoryPostList>
												{userPosts.map((item: Post) => {
													return <InventoryPostItem key={item.id} item={item} />;
												})}
											</InventoryPostList>
										</>
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
						</>
					)}
				</InventoryPostListTemplate>
			</UserPageTemplate>
		</>
	);
}

export default React.memo(UserProfileContainer);
