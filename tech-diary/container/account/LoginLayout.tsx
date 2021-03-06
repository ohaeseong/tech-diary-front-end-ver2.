/* eslint-disable camelcase */
import React, { ChangeEvent, useCallback, useState } from 'react';

import AccountPageTemplate from 'components/account/AccountPageTemplate';
import LoginBox from 'components/account/login/LoginBox';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { RootState } from 'store/modules';
import useForm from 'libs/hooks/useForm';
import { AUTH_LOGIN_REQUEST } from 'store/modules/auth';
import isEmail from 'libs/regEx';
import { server } from 'config/config';
import ModalBox from 'components/common/ModalBox';
import LabelInput from 'components/common/LabelInput';
import useToggle from 'libs/hooks/useToggle';
import Button from 'components/common/Button';
import { color } from 'styles/color';
import ButtonGroup from 'components/common/ButtonGroup';
import useRequest from 'libs/hooks/useRequest';
import { reqeustSignUpEmailSend } from 'libs/repository';
// import Loading from 'components/common/Loading';
// import { FacebookLoginResponse } from 'store/types/auth.types';

type LoginForm = {
	memberId: string;
	pw: string;
};

function LoginLayout() {
	const dispatch = useDispatch();
	const router = useRouter();
	const errorMsg = useSelector((state: RootState) => state.auth.authLoginErrorMsg);
	const loginLinkWithGithub = `${server.host}/auth/redirect/social?social=github&redirectUri=${server.host}/auth/callback/github`;
	const loginLinkWithFacebook = `${server.host}/auth/redirect/social?social=facebook&redirectUri=${server.host}/auth/callback/facebook`;
	const loginLinkWithGoogle = `${server.host}/auth/redirect/social?social=google&redirectUri=${server.host}/auth/callback/google`;

	const [modalIsOpenValue, modalOpenToggle] = useToggle(false);
	const [, , onRequestSendEmail] = useRequest(reqeustSignUpEmailSend, true);
	const [email, setEmail] = useState('');
	// const [isLoading] = useState(false);
	const [modalMsg, setModalMsg] = useState({
		isError: false,
		message: '',
	});

	const [form, onChange] = useForm<LoginForm>({
		memberId: '',
		pw: '',
	});

	const closeModalBox = useCallback(() => {
		setModalMsg({
			isError: false,
			message: '',
		});
		setEmail('');
		modalOpenToggle();
	}, [modalOpenToggle]);

	const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);

	const onSendEmail = useCallback(async () => {
		if (!email) {
			setModalMsg({
				isError: true,
				message: '이메일을 작성해 주세요.',
			});

			return;
		}

		if (!isEmail(email)) {
			setModalMsg({
				isError: true,
				message: '이메일 형식이 아니에요.',
			});

			return;
		}

		const req = {
			email,
		};

		const response = await onRequestSendEmail(req);

		if (response.status === 403) {
			setModalMsg({
				isError: true,
				message: '이미 가입된 이메일 입니다.',
			});

			return;
		}

		closeModalBox();
		toast.success('메일함을 확인해 주세요!', {
			position: toast.POSITION.TOP_RIGHT,
		});
	}, [closeModalBox, email, onRequestSendEmail]);

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

	const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onLogin();
		}
	};

	return (
		<AccountPageTemplate>
			{/* {isLoading ? <Loading /> : <></>} */}
			{modalIsOpenValue ? (
				<ModalBox msg={modalMsg}>
					<LabelInput
						label="이메일 인증"
						margin="1rem 0 2rem 0"
						value={email}
						onChange={handleEmail}
						size="regular"
						justifyContent="center"
					/>
					<ButtonGroup
						sortDirection="row"
						margin="1rem 0rem 0rem 0rem"
						childrenMargin="0rem 0rem 0rem 2rem"
						width="100%"
					>
						<Button size="sm" onClick={closeModalBox} margin="0rem 2rem 0 0">
							취소
						</Button>
						<Button size="sm" btnColor={color.neon_2} onClick={onSendEmail} margin="0rem 0rem 0 2rem">
							메일 보내기
						</Button>
					</ButtonGroup>
				</ModalBox>
			) : (
				<></>
			)}
			<LoginBox
				onLogin={onLogin}
				openModal={modalOpenToggle}
				handleKeypress={handleKeypress}
				onChange={onChange}
				loginLinkWithGithub={loginLinkWithGithub}
				loginLinkWithFacebook={loginLinkWithFacebook}
				loginLinkWithGoogle={loginLinkWithGoogle}
				errorMsg={errorMsg}
				form={form}
			/>
			<ToastContainer autoClose={1500} />
		</AccountPageTemplate>
	);
}

export default LoginLayout;
