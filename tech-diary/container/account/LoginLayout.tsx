import React, { useCallback } from 'react';

import AccountPageTemplate from 'components/account/AccountPageTemplate';
import LoginBox from 'components/account/login/LoginBox';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from 'store/modules';
import useForm from 'libs/hooks/useForm';
import { AUTH_LOGIN_REQUEST } from 'store/modules/auth';

type LoginForm = {
	memberId: string;
	pw: string;
};

function LoginLayout() {
	const dispatch = useDispatch();
	const router = useRouter();
	const errorMsg = useSelector((state: RootState) => state.auth.authLoginErrorMsg);

	const [form, onChange] = useForm<LoginForm>({
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
		<AccountPageTemplate>
			<LoginBox
				onLogin={onLogin}
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
