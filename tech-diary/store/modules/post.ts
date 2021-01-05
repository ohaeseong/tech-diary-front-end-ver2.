import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { getPostList, Post, PostList } from '../types/post.types';

type PostListState = {
	loading?: boolean;
	isPostGetSuccess: boolean;
	kinds?: string;
	successCB: () => null;
	getPostListErrorMsg: string;
	postData: Post[];
};

const initialState: PostListState = {
	loading: false,
	isPostGetSuccess: false,
	getPostListErrorMsg: '',
	kinds: '',
	postData: [],
	successCB: () => null,
};

export const GET_POST_LIST_ERROR_MSG = 'post/GET_POST_LIST_ERROR_MSG';
export const GET_POST_LIST_REQUEST = 'post/GET_POST_LIST_REQUEST';
export const GET_POST_LIST_SUCCESS = 'post/GET_POST_LIST_SUCCESS';
export const GET_POST_LIST_FAILURE = 'post/GET_POST_LIST_FAILURE';

export const setPostListErrorMsg = createAction(GET_POST_LIST_ERROR_MSG)<string>();
export const onPostListGet = createAsyncAction(GET_POST_LIST_REQUEST, GET_POST_LIST_SUCCESS, GET_POST_LIST_FAILURE)<
	getPostList,
	PostList,
	AxiosError
>();

const actions = {
	onPostListGet,
	setPostListErrorMsg,
};

type PostListAction = ActionType<typeof actions>;

export default createReducer<PostListState, PostListAction>(initialState, {
	[GET_POST_LIST_REQUEST]: (state) => ({
		...state,
		loading: true,
		postData: [],
	}),

	[GET_POST_LIST_SUCCESS]: (state, action) => ({
		...state,
		loading: false,
		isPostGetSuccess: true,
		postData: action.payload.posts,
	}),

	[GET_POST_LIST_FAILURE]: (state) => ({
		...state,
		loading: false,
		isPostGetSuccess: false,
	}),

	[GET_POST_LIST_ERROR_MSG]: (state, action) => ({
		...state,
		getPostListErrorMsg: action.payload,
	}),
});
