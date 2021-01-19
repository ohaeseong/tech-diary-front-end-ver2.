import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { Comment, getPostList } from '../types/post.types';

type PostCommentListState = {
	loading?: boolean;
	successCB: () => null;
	commentData: Comment[];
};

const initialState: PostCommentListState = {
	loading: false,
	commentData: [],
	successCB: () => null,
};

export type getCommentList = {
	postId: string;
};

type getSuccessCommentList = {
	commentList: Comment[];
};

// export const GET_POST_COMMENT_ERROR_MSG = 'post/comment/GET_POST_COMMENT_ERROR_MSG';
export const GET_POST_COMMENT_REQUEST = 'post/comment/GET_POST_COMMENT_REQUEST';
export const GET_POST_COMMENT_SUCCESS = 'post/comment/GET_POST_COMMENT_SUCCESS';
export const GET_POST_COMMENT_FAILURE = 'post/comment/GET_POST_COMMENT_FAILURE';

// export const setPostListErrorMsg = createAction(GET_POST_LIST_ERROR_MSG)<string>();
export const onPostCommentListGet = createAsyncAction(
	GET_POST_COMMENT_REQUEST,
	GET_POST_COMMENT_SUCCESS,
	GET_POST_COMMENT_FAILURE
)<getCommentList, getSuccessCommentList, AxiosError>();

const actions = {
	onPostCommentListGet,
};

type PostCommentListAction = ActionType<typeof actions>;

export default createReducer<PostCommentListState, PostCommentListAction>(initialState, {
	[GET_POST_COMMENT_REQUEST]: (state) => ({
		...state,
		loading: true,
		commentData: [],
	}),

	[GET_POST_COMMENT_SUCCESS]: (state, action) => ({
		...state,
		loading: false,
		commentData: action.payload.commentList,
	}),

	[GET_POST_COMMENT_FAILURE]: (state) => ({
		...state,
		loading: false,
	}),
});
