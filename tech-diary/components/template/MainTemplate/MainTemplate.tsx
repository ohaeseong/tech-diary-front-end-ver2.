/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/core';

import * as T from './MainTemplate.styled';

type Props = {
    children: ReactNode,
};

function MainTemplate({ children }: Props) {
    return (
        <T.Template>
            
        </T.Template>
    );
}

export default MainTemplate;