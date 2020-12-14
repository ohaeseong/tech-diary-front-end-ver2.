
/** @jsx jsx */

import { ThemeProvider, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { dark, light } from 'styles/color';

const LoginTemplate = styled.div`
    label: login_template;
    width: 100%;
    height: 100vh;

    border: 1px solid black;

    color: ${props => props.theme.colors.primary};
`;

function LoginLayout() {
    const [themeMode, setThemeMode] = useState('light');


    const theme = themeMode === 'light' ? light : dark;


    return (
        <ThemeProvider theme={light}>
            <LoginTemplate>

            </LoginTemplate>
        </ThemeProvider>
    )
}

export default LoginLayout;