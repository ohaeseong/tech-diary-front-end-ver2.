/** @jsx jsx */
import { ReactNode, useState } from 'react';
import { jsx, ThemeProvider } from '@emotion/react';

import * as T from './MainTemplate.styled';
import { NavBar } from 'components/base/NavBar';
import { gradation } from 'styles/color';

import { light, dark } from 'styles/color';
import Login from 'pages/login';
import LoginLayout from 'components/account/login/LoginLayout';

type Props = {
    children: ReactNode,
};

function MainTemplate({ children }: Props) {
    const [themeMode, setThemeMode] = useState('light');

    const theme = themeMode === 'light' ? light : dark;
    const randomGradationIndex = Math.floor(Math.random() * 3);
    const gradationDatas = Object.values(gradation);
    let gradationEffect = gradationDatas[randomGradationIndex];



    return (
        <ThemeProvider theme={theme}>
            {/* <T.Template>
                <T.Container>
                    <NavBar gradationEffect={gradationEffect}/>
                    <T.MainContents>
                        {children}
                    </T.MainContents>
                </T.Container>
            </T.Template> */}

            <LoginLayout/>
        </ThemeProvider>
    );
}

export default MainTemplate;