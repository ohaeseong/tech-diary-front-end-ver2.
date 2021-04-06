import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { NavBar } from 'components/base/NavBar';
import UserPostListTemplate from 'components/user/UserPostListTemplate';
import UserProfileInfoTemplate from 'components/user/UserProfileInfoTemplate';
import useDarkMode from 'libs/hooks/useDarkMode';
import { getStorage } from 'libs/storage';
import React, { useEffect } from 'react';
import { color, dark } from 'styles/color';
import { UserInfo } from 'store/types/auth.types';

const UserPageTemplate = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 100vh;
	margin-top: 5rem;
`;

type Props = {
	userInfo: UserInfo;
};

function UserProfileContainer({ userInfo }: Props) {
	const router = useRouter();
	const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === 'light';


	useEffect(() => {
		const token = getStorage('tech-token') as string;

		if (!token) {
			router.push('/');
		}
	}, [router]);

	return (
		<>
			<ThemeProvider theme={themeMode ? dark : color}>
				<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} />
				<UserPageTemplate>
					<UserProfileInfoTemplate userInfo={userInfo} />
					<UserPostListTemplate />
				</UserPageTemplate>
			</ThemeProvider>
		</>
	);
}

export default UserProfileContainer;
