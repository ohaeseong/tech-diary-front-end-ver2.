import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { NavBar } from 'components/base/NavBar';
import MainTemplate from 'components/template/mainTemplate/MainTemplate';
import UserPostListTemplate from 'components/user/UserPostListTemplate';
import UserProfileInfoTemplate from 'components/user/UserProfileInfoTemplate';
import useDarkMode from 'libs/hooks/useDarkMode';
import React from 'react';
import { color, dark } from 'styles/color';

const UserPageTemplate = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 100vh;
	margin-top: 5rem;
`;

function UserProfileContainer() {
	const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === 'light';

	return (
		<>
			<ThemeProvider theme={themeMode ? dark : color}>
				<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} />
				<UserPageTemplate>
					<UserProfileInfoTemplate />
					<UserPostListTemplate />
				</UserPageTemplate>
			</ThemeProvider>
		</>
	);
}

export default UserProfileContainer;
