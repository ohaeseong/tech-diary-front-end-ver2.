import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { setStorage } from 'libs/storage';
import { AUTH_REGISTER_REQUEST, onAuthRegister, setRegisterErrorMsg } from 'store/modules/register.auth';
import authRepo from './auth.repository';
import { AUTH_LOGIN_REQUEST, onAuthLogin, setLoginErrorMsg } from '../../modules/auth';
import { onGithubAuthRegister, GITHUB_REGISTER_REQUEST } from '../../modules/register.github.auth';
import { GITHUB_AUTH_LOGIN_REQUEST, onGithubAuthLogin } from '../../modules/github.auth';

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

	if (status === 404) {
		yield put(setLoginErrorMsg('아이디 혹은 비밀번호가 맞지 않습니다.'));
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
	yield executeCallback(successCB);
}

function* onLoginWithGitHubSaga(action: ReturnType<typeof onGithubAuthLogin.request>) {
	const { code, successCB, failCB } = action.payload;

	const { status, data } = yield call(authRepo.loginWithGithub, {
		code,
	});

	if (status === 400) {
		return;
	}

	if (status === 404) {
		const { login, name, id, avatarUrl } = data.data;

		yield executeCallback(failCB ? failCB(login, name, id, avatarUrl) : null);
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
	yield put(onAuthLogin.success());
	yield executeCallback(successCB);
}

function* onRegisterWithGithub(action: ReturnType<typeof onGithubAuthRegister.request>) {
	const { githubId, memberId, memberName, avatarUrl, introduce, successCB } = action.payload;

	const { status, data } = yield call(authRepo.registerWithGithub, {
		githubId,
		memberId,
		memberName,
		avatarUrl,
		introduce,
	});

	if (status === 400) {
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
	yield put(onGithubAuthRegister.success());
	yield executeCallback(successCB);
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

function* watchOnLoginWithGitHub() {
	yield takeLatest(GITHUB_AUTH_LOGIN_REQUEST, onLoginWithGitHubSaga);
}

function* watchOnRegisterWithGitHub() {
	yield takeLatest(GITHUB_REGISTER_REQUEST, onRegisterWithGithub);
}

function* watchOnRegister() {
	yield takeLatest(AUTH_REGISTER_REQUEST, onRegisterAuth);
}

export default function* authSagas() {
	yield all([fork(watchOnLogin), fork(watchOnLoginWithGitHub), fork(watchOnRegisterWithGitHub), fork(watchOnRegister)]);
}
