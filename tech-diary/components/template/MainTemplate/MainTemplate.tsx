import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

import { NavBar } from 'components/base/NavBar';
import { ThemeProvider } from '@emotion/react';
import { color, dark } from 'styles/color';

import useDarkMode from 'libs/hooks/useDarkMode';
import categorys from 'resource/category';
import { Category } from 'components/base/Category';
import GradientBanner from 'components/common/GradientBanner';

export const Template = styled.div`
	position: relavive;
`;

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const MainContents = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-content: center;
	background-color: ${(props) => props.theme.gray_0};
`;

type Props = {
	children: ReactNode;
	isNav?: boolean;
};

function MainTemplate({ children, isNav = true }: Props) {
	const [theme, toggleTheme, componentMounted] = useDarkMode();

	const themeMode = theme === 'light';

	if (!componentMounted) {
		return <div />;
	}

	return (
		<Template>
			<Container>
				<ThemeProvider theme={themeMode ? dark : color}>
					{isNav ? (
						<>
							<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain />
							<GradientBanner />
							<Category categorys={categorys} />
						</>
					) : (
						<></>
					)}
					<MainContents>{children}</MainContents>
				</ThemeProvider>
			</Container>
		</Template>
	);
}

export default MainTemplate;
