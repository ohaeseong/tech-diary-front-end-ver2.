import React, { ReactNode, useState } from 'react';

import { NavBar } from 'components/base/NavBar';
import randomGradation from 'libs/randomGradation';
import { ThemeProvider } from '@emotion/react';
import { color, dark } from 'styles/color';
import * as T from './MainTemplate.styled';

type Props = {
	children: ReactNode;
};

function MainTemplate({ children }: Props) {
	const [isDark, setIsDark] = useState(true);
	const gradationEffect = randomGradation();

	return (
		<ThemeProvider theme={isDark ? dark : color}>
			<T.Template>
				<T.Container>
					<NavBar gradationEffect={gradationEffect} />
					<T.MainContents>{children}</T.MainContents>
				</T.Container>
			</T.Template>
		</ThemeProvider>
	);
}

export default MainTemplate;
