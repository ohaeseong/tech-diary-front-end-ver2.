import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import { color } from 'styles/color';

const Input = styled.input`
    label: account_input;
    width: 20rem;
    height: 2rem;
    padding-left: 0.5rem;
    border: 0.05rem solid ${color.gray_2};
    border-radius: 3px;
    margin-top: 1.5rem;
`;

type Props = {
    isPw?: boolean,
    explanation: string,
    onChange?: (e: ChangeEvent<any>) =>  void;
    name: string,
    value: string,
}

function AccountInput({ isPw, explanation, onChange, name, value}: Props) {
    return(
        <>
            { isPw 
                ? <Input placeholder={explanation} 
                         type={'password'}
                         onChange={onChange}
                         name={name}
                         value={value}/>
                : <Input placeholder={explanation} 
                         onChange={onChange}
                         name={name}
                         value={value}/>
            }
        </>
    );
}

export default AccountInput;