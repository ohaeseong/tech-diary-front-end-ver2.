import React, { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
// import Image from 'next/image';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { TiSocialFacebook } from 'react-icons/ti';
import { FcGoogle } from 'react-icons/fc';

import { color } from 'styles/color';
import { fadein } from 'styles/animation';
import Button from 'components/common/Button';
import ButtonGroup from 'components/common/ButtonGroup';
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
	margin-bottom: 3rem;

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

const OauthButtonsWrap = styled.div`
	display: flex;
	justify-content: space-around;
	/* width: 100%; */
	margin: 0.5rem 0rem 3rem 0rem;
	/* padding: 0rem 1rem; */
	/* border: 1px solid black; */

	& > * {
		cursor: pointer;
	}
`;

const OauthCircle = styled.div<{ isFacebook?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	border: 1px solid ${color.gray_1};

	${(props) =>
		props.isFacebook &&
		`
		background-color: ${color.facebook};
		border: 0px solid ${color.gray_2};
	`}
`;

const LoginTemplateImg = styled.img`
	width: 350px;
	height: 400px;
	margin-top: 2rem;
	object-fit: contain;
`;

const WrapForAnimation = styled.div`
	display: flex;
	flex-direction: column;
	animation: ${fadein} 2s;
`;

const Text = styled.div`
	color: ${color.gray_4};
	cursor: pointer;
	transition: 0.2s ease-in-out;

	&:hover {
		color: ${color.gray_2};
	}
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
type loginForm = {
	memberId: string;
	pw: string;
};

type Props = {
	onLogin: () => void;
	onLoginWithGithub: () => void;
	handleKeypress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
	openModal: () => void;

	errorMsg: string;
	form: loginForm;
};

function LoginBox({ onLogin, onLoginWithGithub, handleKeypress, onChange, errorMsg, form, openModal }: Props) {
	return (
		<LoginBoxWrap>
			<LoginHalfWrap isImage>
				<LoginTextWrap>
					<LoginText fontSize="title">Welcom to Tech-Blog!</LoginText>
					<LoginText fontSize="description">당신의 지식을 공유해 주세요!</LoginText>
				</LoginTextWrap>
				<WrapForAnimation>
					<LoginTemplateImg src="/static/loginTemplateImage.png" alt="login_template_image.png" />
				</WrapForAnimation>
			</LoginHalfWrap>
			<LoginHalfWrap isImage={false}>
				<LoginTextWrap>
					<LoginText fontSize="title">로그인을 해주세요!</LoginText>
					<LoginText fontSize="description" color={color.neon_1}>
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
					<ButtonGroup sortDirection="column" childrenMargin="0.5rem 0 0.5rem 0" margin="1.5rem 0 1rem 0">
						<Button width="20.5rem" onClick={onLogin} btnColor={color.neon_2}>
							Log in
						</Button>
					</ButtonGroup>
					<OauthButtonsWrap>
						<AiFillGithub size="3.2rem" onClick={onLoginWithGithub} />
						<OauthCircle isFacebook>
							<TiSocialFacebook size="2.5rem" color="white" />
						</OauthCircle>
						<OauthCircle>
							<FcGoogle size="2.3rem" />
						</OauthCircle>
					</OauthButtonsWrap>
				</WrapForAnimation>
				<WrapForAnimation>
					<LinkWrap>
						<Link href="/">
							<LinkText>Home</LinkText>
						</Link>
					</LinkWrap>
					<LinkWrap>
						<Text onClick={openModal}>Sign up/</Text>
						<Link href="/signup">
							<LinkText>Forgot the password?</LinkText>
						</Link>
					</LinkWrap>
				</WrapForAnimation>
			</LoginHalfWrap>
		</LoginBoxWrap>
	);
}

export default React.memo(LoginBox);
