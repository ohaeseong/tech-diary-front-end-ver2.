/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';

import * as T from './MainTemplate.styled';
import { NavBar } from 'components/base/NavBar';
import { gradation } from 'styles/color';

type Props = {
    children: ReactNode,
};

function MainTemplate({ children }: Props) {
    const randomGradationIndex = Math.floor(Math.random() * 3);
    const gradationDatas = Object.values(gradation);
    let gradationEffect = gradationDatas[randomGradationIndex];

    return (
        <T.Template>
            <T.Container>
                <NavBar gradationEffect={gradationEffect}/>
                <T.MainContents>
                    {children}
                </T.MainContents>
            </T.Container>
        </T.Template>
    );
}

export default MainTemplate;