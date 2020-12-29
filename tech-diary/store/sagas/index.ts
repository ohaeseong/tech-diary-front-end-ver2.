import { all, call } from 'redux-saga/effects';
import authSaga from './auth/auth.saga';
import postSaga from './post/post.saga';

export default function* sagas() {
	yield all([call(authSaga), call(postSaga)]);
}
