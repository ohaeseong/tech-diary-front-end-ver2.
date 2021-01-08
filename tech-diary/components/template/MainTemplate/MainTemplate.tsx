import React, { ReactNode } from 'react';

import * as T from 'components/template/MainTemplate/MainTemplate.styled';
import { NavBar } from 'components/base/NavBar';
import { ThemeProvider } from '@emotion/react';
import { color, dark } from 'styles/color';

import useDarkMode from 'libs/hooks/useDarkMode';
import categorys from 'resource/category';
import { Category } from 'components/base/Category';
import GradientBanner from 'components/common/GradientBanner';

type Props = {
	children: ReactNode;
};

function MainTemplate({ children }: Props) {
	const [theme, toggleTheme, componentMounted] = useDarkMode();

	const themeMode = theme === 'light';

	if (!componentMounted) {
		return <div />;
	}

	return (
		<T.Template>
			<T.Container>
				<ThemeProvider theme={themeMode ? dark : color}>
					<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} />
					<GradientBanner />
					<Category categorys={categorys} />
					<T.MainContents>{children}</T.MainContents>
				</ThemeProvider>
			</T.Container>
		</T.Template>
	);
}

export default MainTemplate;
