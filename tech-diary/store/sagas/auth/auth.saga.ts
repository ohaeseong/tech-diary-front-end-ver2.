import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import authRepo from './auth.repository';
import { AUTH_LOGIN_REQUEST, onAuthLogin } from '../../modules/auth'
import { setStorage } from 'libs/storage';

function* executeCallback(cb?: () => void) {
    if (cb) {
        yield call(cb);
    }
};

function* onLoginSaga(action: ReturnType<typeof onAuthLogin.request>) {
    const { memberId, pw } = action.payload;

    const { status, data } = yield call(authRepo.authLogInReq, {
        memberId,
        pw,
    });

    if (status === 404) {
        console.log('not found the user');

        return;
    }

    


    
    
    const payload = {
        token: data.data.token,
        refreshToken: data.data.refreshToken,
    };

    setStorage('tech-token', payload.token);

    yield put(onAuthLogin.success());
    // yield executeCallback(successCB);
}

export default function* authSagas() {
    yield all([fork(watchOnLogin)]);
}

function* watchOnLogin() {
    yield takeLatest(AUTH_LOGIN_REQUEST, onLoginSaga);
}