import React, { ChangeEvent, useCallback, useState } from 'react';

import AccountPageTemplate from 'components/account/AccountPageTemplate';
import LoginBox from 'components/account/login/LoginBox';
import { useDispatch, useSelector } from 'react-redux';
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

type LoginForm = {
	memberId: string;
	pw: string;
};

function LoginLayout() {
	const dispatch = useDispatch();
	const router = useRouter();
	const errorMsg = useSelector((state: RootState) => state.auth.authLoginErrorMsg);

	const [modalIsOpenValue, modalOpenToggle] = useToggle(false);
	const [, , onRequestSendEmail, ,] = useRequest(reqeustSignUpEmailSend);
	const [email, setEmail] = useState('');
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
				message: '이메일을 형식이 아니에요.',
			});

			return;
		}

		const req = {
			email,
		};

		await onRequestSendEmail(req);

		closeModalBox();
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

	const onLoginWithGithub = async () => {
		const GIT_HUB_LOGIN_URL = 'https://github.com/login/oauth/authorize?';
		const CLIENT_ID = '38450a3f2fd57007603a';
		const REDIRECT_URI = `${server.client_url}/login/github-callback`;

		window.location.href = `${GIT_HUB_LOGIN_URL}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
	};

	const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onLogin();
		}
	};

	return (
		<AccountPageTemplate>
			{modalIsOpenValue ? (
				<ModalBox msg={modalMsg}>
					<LabelInput
						label="이메일 인증"
						margin="2rem 0 1.5rem 0"
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
						<Button size="sm" onClick={closeModalBox}>
							취소
						</Button>
						<Button size="sm" btnColor={color.neon_2} onClick={onSendEmail}>
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
				onLoginWithGithub={onLoginWithGithub}
				handleKeypress={handleKeypress}
				onChange={onChange}
				errorMsg={errorMsg}
				form={form}
			/>
		</AccountPageTemplate>
	);
}

export default LoginLayout;
