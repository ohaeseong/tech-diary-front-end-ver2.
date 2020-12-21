import React, { ReactNode } from 'react';

import * as T from './MainTemplate.styled';
import { NavBar } from 'components/base/NavBar';
import { randomGradation } from 'libs/randomGradation';

type Props = {
    children: ReactNode,
};

function MainTemplate({ children }: Props) {
    const gradationEffect = randomGradation();

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