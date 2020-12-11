/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import  styled  from '@emotion/styled';
import Link from 'next/link';


import React, { ReactNode } from 'react';

const Btn = styled.button<{ size?: string, margin?: string }>`
    label: button;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: 0;
    margin: 1rem 0.5rem;
    background-color: transparent;
    color: #E0DDDC;
    transform: 0.3s ease-in-out;
    font-family: 'Spoqa Han Sans';
    font-weight: 300;

    &:hover {
        cursor: pointer;
        transform: 0.3s ease-in-out;
        border-bottom: 0.15rem solid #E0DDDC;
    }

    ${props => {
        if (props.size === 'sm') {
            return css`
                font-size: 0.85rem;
            `;
        }

        if (props.size === 'big') {
            return css`
                font-size: 1.5rem;
            `;
        }

        return css`font-size: 1rem;`;
    }}

    ${props => props.margin && `
        margin: ${props.margin};
    `}
`;


type Props = {
    size?: string;
    margin?: string;
    children: ReactNode;
}

function LinkButton({ 
        size = 'default',
        margin = '',
        children, }: Props) {
    return(
        <Btn size={size} margin={margin}>
            {children}
        </Btn>
    );
}

export default LinkButton;