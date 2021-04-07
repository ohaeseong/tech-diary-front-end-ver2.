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
import { RiBookMarkFill } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { HiOutlineBookOpen } from 'react-icons/hi';

const UserPageTemplate = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 100vh;
	margin-top: 5rem;

	background-color: ${(props) => props.theme.white};
`;

const UserPostListTemplate = styled.div`
	width: 60rem;
	height: 100vh;
	border-right: 1px solid ${(props) => props.theme.gray_1};
`;

type Props = {
	userInfo: UserInfo;
	userPosts: Array<Post>;
};

function UserProfileContainer({ userInfo, userPosts }: Props) {
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
		// console.log(tokenDecoded.memberId.toString());
		

		if (token) {
			if (tokenDecoded.memberId.toString() === userInfo.memberId) {
				setIsMine(true);
			}
		}
	}, [userInfo.memberId]);

	return (
		<>
			<ThemeProvider theme={themeMode ? dark : color}>
				<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} />
				<UserPageTemplate>
					<UserProfileInfoTemplate userInfo={userInfo} />
					<UserPostListTemplate>
						<UserNabBar>
							<UserNavItem>
								<HiOutlineBookOpen size={iconSize} /> 게시글
							</UserNavItem>
							{isMine ? (
								<>
									<UserNavItem>
										<BiTimeFive size={iconSize} /> 임시저장된 게시글
									</UserNavItem>
									<UserNavItem>
										<RiBookMarkFill size={iconSize} /> 북마크한 게시글
									</UserNavItem>
								</>
							) : (
								<></>
							)}
						</UserNabBar>
					</UserPostListTemplate>
				</UserPageTemplate>
			</ThemeProvider>
		</>
	);
}

export default UserProfileContainer;
