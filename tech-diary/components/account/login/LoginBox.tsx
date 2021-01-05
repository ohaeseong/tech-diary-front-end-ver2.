/** @tsx */

import React, { useCallback } from 'react';
import { css, ThemeProvider, useTheme, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/modules';
import { color } from 'styles/color';
import { fadein } from 'styles/animation';
import Button from 'components/common/Button';
import ButtonGroup from 'components/common/ButtonGroup';
import { AUTH_LOGIN_REQUEST } from 'store/modules/auth';
import useForm from 'libs/hooks/useForm';
import AccountInput from 'components/account/AccountInput';

const LoginBoxWrap = styled.div`
	display: flex;
	flex-direction: row;
	width: 70rem;
	height: 40rem;
	background-color: ${(props) => props.theme.white};
	box-shadow: 0 2px 6px 0 ${color.shadow};
	animation: ${fadein} 2s;
`;

const LoginHalfWrap = styled.div<{ isImage: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
	width: 35rem;
	height: 100%;

	${(props) =>
		props.isImage &&
		`
        background-color: ${color.light_purple};
    `}
`;

const LoginTextWrap = styled.div`
	width: 100%;
	height: 5rem;
	margin-bottom: 1rem;

	& > * {
		margin-top: 1rem;
	}
`;

const LoginText = styled.div<{ fontSize: string; color?: string }>`
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

		return ``;
	}};

	${(props) =>
		props.color &&
		`
            color: ${props.color};
    	`};
`;

const WrapForAnimation = styled.div`
	display: flex;
	flex-direction: column;
	animation: ${fadein} 2s;
`;

const LinkWrap = styled.div`
	display: flex;
	flex-direction: row;

	margin-right: 7rem;

	& > * {
		margin-right: 0.1rem;
		margin-bottom: 1rem;
	}
`;

const LinkText = styled.a`
	color: ${color.gray_4};
	cursor: pointer;
	transition: 0.2s ease-in-out;

	&:hover {
		color: ${color.gray_2};
	}
`;

type createLoginForm = {
	memberId: string;
	pw: string;
};

function LoginBox() {
	const dispatch = useDispatch();
	const router = useRouter();
	const theme = useTheme();
	const errorMsg = useSelector((state: RootState) => state.auth.authLoginErrorMsg);

	const [form, onChange] = useForm<createLoginForm>({
		memberId: '',
		pw: '',
	});

	const onLogin = useCallback(() => {
		const { memberId, pw } = form;

		dispatch({
			type: AUTH_LOGIN_REQUEST,
			payload: {
				memberId,
				pw,
				successCB: () => {
					router.back();
				},
			},
		});
	}, [dispatch, form, router]);

	const onLoginWithGithub = async () => {
		const GIT_HUB_LOGIN_URL = 'https://github.com/login/oauth/authorize?';
		const CLIENT_ID = '38450a3f2fd57007603a';
		const REDIRECT_URI = 'http://localhost:3000/login/github-callback';

		window.location.href = `${GIT_HUB_LOGIN_URL}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
	};

	const handleKeypress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			onLogin();
		}
	};

	return (
		<LoginBoxWrap>
			<LoginHalfWrap isImage>
				<LoginTextWrap>
					<LoginText fontSize="title">Welcom to Tech-Blog!</LoginText>
					<LoginText fontSize="description">Write your post!</LoginText>
				</LoginTextWrap>
				<WrapForAnimation>
					<Image src="/image/loginTemplateImage.png" alt="login_template_image" width={300} height={450} />
				</WrapForAnimation>
			</LoginHalfWrap>
			<LoginHalfWrap isImage={false}>
				<LoginTextWrap>
					<LoginText fontSize="title">로그인을 해주세요!</LoginText>
					<LoginText fontSize="description" color={color.error}>
						{errorMsg}
					</LoginText>
				</LoginTextWrap>
				<WrapForAnimation>
					<AccountInput
						explanation="input your ID!"
						onChange={onChange}
						name="memberId"
						value={form.memberId}
						handleKeyPress={handleKeypress}
					/>
					<AccountInput
						explanation="input your PW!"
						isPw
						onChange={onChange}
						name="pw"
						value={form.pw}
						handleKeyPress={handleKeypress}
					/>
				</WrapForAnimation>
				<WrapForAnimation>
					<ButtonGroup sortDirection="column">
						<Button width="20rem" onClick={onLogin}>
							Log in
						</Button>
						<Button width="20rem" onClick={onLoginWithGithub}>
							Log in with GitHub
						</Button>
					</ButtonGroup>
				</WrapForAnimation>
				<WrapForAnimation>
					<LinkWrap>
						<Link href="/">
							<LinkText>Home</LinkText>
						</Link>
					</LinkWrap>
					<LinkWrap>
						<Link href="/signup">
							<LinkText>Sign up/</LinkText>
						</Link>
						<Link href="/signup">
							<LinkText>Forgot the password?</LinkText>
						</Link>
					</LinkWrap>
				</WrapForAnimation>
			</LoginHalfWrap>
		</LoginBoxWrap>
	);
}

export default LoginBox;
