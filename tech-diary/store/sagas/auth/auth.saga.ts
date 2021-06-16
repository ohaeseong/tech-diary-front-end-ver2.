import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { setStorage } from 'libs/storage';
import { AUTH_REGISTER_REQUEST, onAuthRegister, setRegisterErrorMsg } from 'store/modules/register.auth';
import {
	AUTH_REGISTER_SOCIAL_REQUEST,
	onSocialAuthRegister,
	setSocialAuthRegisterErrorMsg,
} from 'store/modules/register.with.social';
import { AUTH_LOGIN_REQUEST, onAuthLogin, setLoginErrorMsg, setUserInfoState } from 'store/modules/auth';
import authRepo from './auth.repository';

function* executeCallback(cb?: () => void) {
	if (cb) {
		yield call(cb);
	}
}

function* onLoginSaga(action: ReturnType<typeof onAuthLogin.request>) {
	const { memberId, pw, successCB } = action.payload;

	const { status, data } = yield call(authRepo.authLogInReq, {
		memberId,
		pw,
	});

	if (status === 400) {
		yield put(setLoginErrorMsg('아이디 혹은 비밀번호를 작성해주세요.'));
		return;
	}

	if (status === 403) {
		yield put(setLoginErrorMsg('아이디 혹은 비밀번호가 맞지 않습니다.'));
		return;
	}

	if (status === 404) {
		yield put(setLoginErrorMsg('가입되지 않은 회원입니다.'));
		return;
	}

	if (status === 500) {
		yield put(setLoginErrorMsg('500 error!'));
		return;
	}

	const payload = {
		token: data.data.token,
		refreshToken: data.data.refreshToken,
		member: data.data.member,
	};

	setStorage('user-info', payload.member);
	setStorage('tech-token', payload.token);
	yield put(onAuthLogin.success());
	yield put(setLoginErrorMsg(''));
	yield put(setUserInfoState(payload.member));
	yield executeCallback(successCB);
}

function* onRegisterWithSocial(action: ReturnType<typeof onSocialAuthRegister.request>) {
	const { socialId, memberId, memberName, profileImage, introduce, email, successCB } = action.payload;

	const { status, data } = yield call(authRepo.registerWithSocial, {
		socialId,
		memberId,
		memberName,
		profileImage,
		introduce,
		email,
	});

	if (status === 400) {
		yield put(setSocialAuthRegisterErrorMsg('작성 내용들을 다시 확인 해주세요!'));
		return;
	}

	if (status === 409) {
		yield put(setSocialAuthRegisterErrorMsg('중복 아이디 입니다!'));
		return;
	}

	if (status === 500) {
		yield put(setSocialAuthRegisterErrorMsg('서버 에러 나중에 다시 시도해주세요.'));
		return;
	}

	const payload = {
		token: data.data.token,
		member: data.data.member,
	};

	setStorage('user-info', payload.member);
	setStorage('tech-token', payload.token);
	yield put(onSocialAuthRegister.success());
	yield executeCallback(successCB);
}

export const GET_USER_INFO = 'auth/GET_USER_INFO' as any;

function* getUserInfoById(action: { payload: { userId: string; successCB: any } }) {
	const { userId, successCB } = action.payload;
	const { status, data } = yield call(authRepo.getUserInfo, {
		memberId: userId,
	});

	if (status === 400) {
		return;
	}

	if (status === 500) {
		return;
	}

	const payload = {
		member: data.data,
	};

	yield executeCallback(successCB(payload));
	// setStorage('user-info', payload.member);
}

function* onRegisterAuth(action: ReturnType<typeof onAuthRegister.request>) {
	const { memberId, memberName, pw, introduce, code, successCB, failCB } = action.payload;

	const { status, data } = yield call(authRepo.registerAuth, {
		memberId,
		memberName,
		pw,
		code,
		introduce,
	});

	if (status === 401) {
		// yield put(setRegisterErrorMsg('잘못된 접근입니다.'));
		yield executeCallback(failCB);
		return;
	}

	if (status === 403) {
		yield put(setRegisterErrorMsg('이미 가입된 아이디 입니다.'));
		return;
	}

	if (status === 400) {
		yield put(setRegisterErrorMsg('잘못된 요청입니다.'));
		return;
	}

	if (status === 500) {
		return;
	}

	const payload = {
		token: data.data.token,
		member: data.data.member,
	};

	setStorage('user-info', payload.member);
	setStorage('tech-token', payload.token);
	yield put(onAuthRegister.success());
	yield executeCallback(successCB);
}

function* watchOnLogin() {
	yield takeLatest(AUTH_LOGIN_REQUEST, onLoginSaga);
}

// function* watchOnLoginWithGitHub() {
// 	yield takeLatest(GITHUB_AUTH_LOGIN_REQUEST, onLoginWithGitHubSaga);
// }

// function* watchOnLoginWithFacebook() {
// 	yield takeLatest(FACEBOOK_AUTH_LOGIN_REQUEST, onLoginWithFacebookSaga);
// }

function* watchOnRegisterWithSocial() {
	yield takeLatest(AUTH_REGISTER_SOCIAL_REQUEST, onRegisterWithSocial);
}

function* watchOnRegister() {
	yield takeLatest(AUTH_REGISTER_REQUEST, onRegisterAuth);
}

function* watchOnGetUserInfo() {
	yield takeLatest(GET_USER_INFO, getUserInfoById);
}
export default function* authSagas() {
	yield all([
		fork(watchOnLogin),
		// fork(watchOnLoginWithGitHub),
		fork(watchOnRegisterWithSocial),
		fork(watchOnRegister),
		// fork(watchOnLoginWithFacebook),
		fork(watchOnGetUserInfo),
	]);
}
