import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import authRepo from './auth.repository';
import { AUTH_LOGIN_REQUEST, onAuthLogin, setLoginErrorMsg } from '../../modules/auth'
import { GITHUB_AUTH_LOGIN_REQUEST, onGithubAuthLogin } from '../../modules/github.auth';
import { setStorage } from 'libs/storage';

function* executeCallback(cb?: () => void) {
    if (cb) {
        yield call(cb);
    }
};

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
    };

    setStorage('tech-token', payload.token);
    yield put(onAuthLogin.success());
    yield put(setLoginErrorMsg(''));
    yield executeCallback(successCB);
}

function* onLoginWithGitHubSaga(action: ReturnType<typeof onGithubAuthLogin.request>) {
    const { code, successCB } = action.payload;

    const { status, data } = yield call(authRepo.loginWithGithub, {
        code
    });

    if (status === 400) {
        return;
    }

    if (status === 404) {
        return;
    }

    if (status === 500) {
        return;
    }

    const payload = {
        token: data.data.token,
    };

    setStorage('tech-token', payload.token);
    yield put(onGithubAuthLogin.success());
    yield executeCallback(successCB);
}

export default function* authSagas() {
    yield all([fork(watchOnLogin), fork(watchOnLoginWithGitHub)]);
}

function* watchOnLogin() {
    yield takeLatest(AUTH_LOGIN_REQUEST, onLoginSaga);
}

function* watchOnLoginWithGitHub() {
    yield takeLatest(GITHUB_AUTH_LOGIN_REQUEST, onLoginWithGitHubSaga);
}