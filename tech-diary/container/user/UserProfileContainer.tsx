import { ThemeProvider } from '@emotion/react';
import { NavBar } from 'components/base/NavBar';
import UserProfileInfoTemplate from 'components/user/UserProfileInfoTemplate';
import useDarkMode from 'libs/hooks/useDarkMode';
import React from 'react';
import { color, dark } from 'styles/color';

function UserProfileContainer() {
	const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === 'light';

	return (
		<>
			<ThemeProvider theme={themeMode ? dark : color}>
				<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} />
				<UserProfileInfoTemplate />
			</ThemeProvider>
		</>
	);
}

export default UserProfileContainer;
