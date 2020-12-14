import styled from '@emotion/styled';
import { color } from 'styles/color';
import { fadein } from 'styles/animation';
import Image from 'next/image';
import { css } from '@emotion/react';
import Button from 'components/common/Button';
import AccountInput from '../AccountInput';
import ButtonGroup from 'components/common/ButtonGroup';
import Link from 'next/link';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AUTH_LOGIN_REQUEST } from 'store/modules/auth';
import useForm from 'libs/hooks/useForm';

const LoginBoxWrap = styled.div`
    label: login_box_wrap;
    display: flex;
    flex-direction: row;
    width: 70rem;
    height: 40rem;
    background-color: ${color.white};
    box-shadow: 0 2px 6px 0 ${color.shadow};
    animation: ${fadein} 2s;
`;

const LoginHalfWrap = styled.div<{ isImage: boolean }>`
    label: login_half_wrap;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 35rem;
    height: 100%;

    ${props => props.isImage && `
        background-color: ${color.light_purple};
    `}
`;

const LoginWelcomTextWrap = styled.div`
    label: login_welcom_text_wrap;
    width: 100%;
    height: 5rem;
    margin-bottom: 1rem;

    & > * {
        margin-top: 0.5rem;
    }
`;

const LoginWelcomText = styled.div<{ fontSize: string }>`
    label: login_welcom_text;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${color.gray_3};

    ${(props) => {
        if (props.fontSize === 'title') {
            return css`
                font-size: 2rem;
                color: ${color.gray_5};
            `;
        }

        if (props.fontSize === 'description') {
            return css`
                font-size: 1rem;
            `;
        }
    }}
`;

const WrapForAnimation = styled.div`
    label: wrap_for_animation;
    display: flex;
    flex-direction: column;
    animation: ${fadein} 2s;
`;

const LinkWrap = styled.div`
    label: link_wrap;
    display: flex;
    flex-direction: row;
    margin-right: 7rem;

    & > * {
        margin-right: 0.1rem;
    }
`;

const LinkText = styled.a`
    label: link_text;
    color: ${color.gray_4};
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        color: ${color.gray_2};
    }
`;

type createLoginForm = {
    memberId: string,
    pw: string,
}

function LoginBox() {
    const [form, onChange] = useForm<createLoginForm>({
        memberId: '',
        pw: ''
    });
    
    const dispatch = useDispatch();

    const onLogin = useCallback(() => {
        const { memberId, pw } = form;

        dispatch({
            type: AUTH_LOGIN_REQUEST,
            payload: {
                memberId,
                pw,
            },
        });

    }, [dispatch, form]);


    return (
        <LoginBoxWrap>
            <LoginHalfWrap isImage={true}>
                <LoginWelcomTextWrap>
                    <LoginWelcomText fontSize={'title'}>
                        Welcom to Login!
                    </LoginWelcomText>
                    <LoginWelcomText fontSize={'description'}>
                        this is description
                    </LoginWelcomText>
                </LoginWelcomTextWrap>
                <WrapForAnimation>
                    <Image src={'/image/loginTemplateImage.png'} 
                            alt={'login_template_image'}
                            width={300}
                            height={450}
                            />
                </WrapForAnimation>
            </LoginHalfWrap>
            <LoginHalfWrap isImage={false}>
                <LoginWelcomTextWrap>
                    <LoginWelcomText fontSize={'title'}>
                        로그인을 해주세요!
                    </LoginWelcomText>
                </LoginWelcomTextWrap>
                <WrapForAnimation>
                    <AccountInput explanation={'input your ID!'} 
                                  onChange={onChange}
                                  name={'memberId'}
                                  value={form.memberId}/>
                    <AccountInput explanation={'input your PW!'} 
                                  isPw={true} 
                                  onChange={onChange}
                                  name={'pw'}
                                  value={form.pw}/>
                </WrapForAnimation>
                <WrapForAnimation>
                    <ButtonGroup sortDirection={'column'}>
                        <Button
                            width={'20rem'}
                            onClick={onLogin}>
                            Log in
                        </Button>
                        <Button
                            width={'20rem'}>
                            Log in with GitHub
                        </Button>
                    </ButtonGroup>
                </WrapForAnimation>
                <WrapForAnimation>
                    <LinkWrap>
                        <Link href={'/signup'}>
                            <LinkText>Sign up/</LinkText>
                        </Link>
                        <Link href={'/signup'}>
                            <LinkText>Forgot the password?</LinkText>
                        </Link>
                    </LinkWrap>
                </WrapForAnimation>
            </LoginHalfWrap>
        </LoginBoxWrap>
    );
}

export default LoginBox;