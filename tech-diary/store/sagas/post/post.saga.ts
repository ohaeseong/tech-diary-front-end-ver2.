import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import postRepo from './post.repository';
import { setPostListErrorMsg, onPostListGet, GET_POST_LIST_REQUEST } from '../../modules/post';
// import { GET_POST_COMMENT_REQUEST, onPostCommentListGet } from '../../modules/post.comment.count';

function* executeCallback(cb?: () => void) {
	if (cb) {
		yield call(cb);
	}
}

function* onRequestGetPostList(action: ReturnType<typeof onPostListGet.request>) {
	const { category, limit, successCB, kinds } = action.payload;

	const { status, data } = yield call(postRepo.getPostListReq, {
		category,
		limit,
		kinds,
	});

	if (status === 400) {
		setPostListErrorMsg('request 400 error');
		return;
	}

	const payload = {
		posts: data.data.posts,
	};

	yield put(onPostListGet.success(payload));
	yield executeCallback(successCB);
}

function* watchOnRequestGetPostList() {
	yield takeLatest(GET_POST_LIST_REQUEST, onRequestGetPostList);
}

export default function* postSagas() {
	yield all([fork(watchOnRequestGetPostList)]);
}
