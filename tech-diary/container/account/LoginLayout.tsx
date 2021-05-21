/* eslint-disable camelcase */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

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
import { id, server } from 'config/config';
import ModalBox from 'components/common/ModalBox';
import LabelInput from 'components/common/LabelInput';
import useToggle from 'libs/hooks/useToggle';
import Button from 'components/common/Button';
import { color } from 'styles/color';
import ButtonGroup from 'components/common/ButtonGroup';
import useRequest from 'libs/hooks/useRequest';
import { reqeustSignUpEmailSend } from 'libs/repository';
import { GITHUB_AUTH_LOGIN_REQUEST } from 'store/modules/github.auth';
import Loading from 'components/common/Loading';
// import { FacebookLoginResponse } from 'store/types/auth.types';
// import { FACEBOOK_AUTH_LOGIN_REQUEST } from 'store/modules/facebook.auth';

type LoginForm = {
	memberId: string;
	pw: string;
};

type AuthResponse = {
	accessToken: string;
	expiresIn: number;
	signedRequest: string;
	userId: string;
	data_access_expiration_time: number;
	graphDomain: string;
};

type Response = {
	status: 'connected' | 'not_authorized' | 'unknown';
	authResponse: null | AuthResponse;
};

function LoginLayout() {
	const dispatch = useDispatch();
	const router = useRouter();
	const errorMsg = useSelector((state: RootState) => state.auth.authLoginErrorMsg);

	const [modalIsOpenValue, modalOpenToggle] = useToggle(false);
	const [, , onRequestSendEmail] = useRequest(reqeustSignUpEmailSend, true);
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
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

	const checkFacebookLoginState = (checkResponse: Response) => {
		if (checkResponse.status === 'connected') {
			// 로그인 돼있을 때 작업
		} else {
			// 로그인이 되어있지 않다면 ('not_authorized' | 'unknown')
			(window as any).FB.login((response: Response) => {
				// 로그인 하거나 회원가입 할 수 있는 팝업을 띄웁니다.
				console.log(response);
			});
		}
	};

	const checkLogin = useCallback(() => {
		(window as any).FB.getLoginStatus((checkResponse: Response) => {
			checkFacebookLoginState(checkResponse);
		});
	}, []);

	const setFBAsyncInit = useCallback(() => {
		(window as any).fbAsyncInit = () => {
			(window as any).FB.init({
				version: `v6.0`, // 작성일 기준 버전이 v6.0 입니다.
				appId: id, // 발급받은 App ID 를 넣어줍니다.
				xfbml: true,
				cookie: true,
			});
		};
	}, []);

	const loadFacebookSdk = useCallback(() => {
		((d, s, uid) => {
			// 이런것 까지 타입을...잡아야 하는지는 잘 모르겠습니다 ;ㅅ;
			const element = d.getElementsByTagName(s)[0];
			const fjs = element as Element;
			let js = element as any;
			if (d.getElementById(uid)) {
				return;
			}
			js = d.createElement(s);
			js.id = uid;
			js.src = `https://connect.facebook.net/en_US/sdk.js`;
			fjs.parentNode!.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');
	}, []);

	// const facebookLoginCallback = useCallback(
	// 	(response: FacebookLoginResponse) => {
	// 		const { name, userID, accessToken } = response;
	// 		dispatch({
	// 			type: FACEBOOK_AUTH_LOGIN_REQUEST,
	// 			payload: {
	// 				accessToken,
	// 				userId: userID,
	// 				userName: name,
	// 				successCB: () => {
	// 					setIsLoading(false);
	// 					router.push(`${server.client_url}`);
	// 				},
	// 				failCB: (userId: string, memberName: string, profileImage: string) => {
	// 					setIsLoading(false);
	// 					router.push({
	// 						pathname: `${server.client_url}/register/${userId}`,
	// 						query: {
	// 							member_name: memberName,
	// 							social_id: userId,
	// 							profile_image: profileImage,
	// 						},
	// 					});
	// 				},
	// 			},
	// 		});
	// 	},
	// 	[dispatch, router]
	// );

	const onLoginWithGithub = useCallback(async () => {
		const GIT_HUB_LOGIN_URL = 'https://github.com/login/oauth/authorize?';
		const CLIENT_ID = id.githubClientId;
		const REDIRECT_URI = `${server.client_url}/login`;
		setIsLoading(true);

		router.push(`${GIT_HUB_LOGIN_URL}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`);
	}, [router]);

	const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onLogin();
		}
	};

	useEffect(() => {
		loadFacebookSdk();
		setFBAsyncInit();
	}, [loadFacebookSdk, setFBAsyncInit]);

	useEffect(() => {
		if (router.query.code) {
			dispatch({
				type: GITHUB_AUTH_LOGIN_REQUEST,
				payload: {
					code: router.query.code,
					successCB: () => {
						setIsLoading(false);
						router.push(`${server.client_url}`);
					},
					failCB: (memberName: string, memberId: string, githubId: string, profileImage: string) => {
						setIsLoading(false);
						router.push({
							pathname: `${server.client_url}/register/${memberId}`,
							query: {
								member_name: memberName,
								social_id: githubId,
								profile_image: profileImage,
							},
						});
					},
				},
			});
		}
	}, [dispatch, router, router.query.code]);

	return (
		<AccountPageTemplate>
			{isLoading ? <Loading /> : <></>}
			{modalIsOpenValue ? (
				<ModalBox msg={modalMsg}>
					<LabelInput
						label="이메일 인증"
						margin="1rem 0 2rem 0"
						value={email}
						onChange={handleEmail}
						placeholder="이미 가입된 이메일로 요청할 경우 해당 계정으로 로그인 링크가 전송됩니다."
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
				onLoginWithGithub={onLoginWithGithub}
				handleKeypress={handleKeypress}
				onChange={onChange}
				// facebookLoginCallback={facebookLoginCallback}
				checkLogin={checkLogin}
				errorMsg={errorMsg}
				form={form}
			/>
			<ToastContainer autoClose={1500} />
		</AccountPageTemplate>
	);
}

export default LoginLayout;
