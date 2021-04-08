import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { NavBar } from 'components/base/NavBar';
import UserProfileInfoTemplate from 'components/user/UserProfileInfoTemplate';
import useDarkMode from 'libs/hooks/useDarkMode';
import { getStorage } from 'libs/storage';
import React, { useEffect, useState } from 'react';
import { color, dark } from 'styles/color';
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

	font-size: 2rem;
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
	const [theme, toggleTheme] = useDarkMode();
	const [isMine, setIsMine] = useState(false);

	const iconSize = '1.5rem';
	const themeMode = theme === 'light';

	// useEffect(() => {
	// 	const token = getStorage('tech-token') as string;

	// 	if (!token) {
	// 		router.push('/');
	// 	}
	// }, [router]);

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
	}, [posts, router, userInfo.memberId]);

	return (
		<>
			<ThemeProvider theme={themeMode ? dark : color}>
				<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} />
				<UserPageTemplate>
					<UserProfileInfoTemplate userInfo={userInfo} />
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
							<UserIntroduce intro={userInfo.introduce || '소개글을 작성해 자신을 소개해 보세요!'} />
						)}
					</UserPostListTemplate>
				</UserPageTemplate>
			</ThemeProvider>
		</>
	);
}

export default UserProfileContainer;
