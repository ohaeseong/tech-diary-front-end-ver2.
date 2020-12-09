/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';

import * as T from './MainTemplate.styled';

type Props = {
    children: ReactNode,
};

function MainTemplate({ children }: Props) {
    return (
        <T.Template>
            <T.Container>
                <T.MainContents>
                    {children}
                </T.MainContents>
            </T.Container>
        </T.Template>
    );
}

export default MainTemplate;