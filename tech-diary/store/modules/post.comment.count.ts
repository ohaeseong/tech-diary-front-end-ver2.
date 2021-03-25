import { ActionType, createReducer, createAction } from 'typesafe-actions';

type PostCommentCountState = {
	commentCount: number;
};

const initialState: PostCommentCountState = {
	commentCount: 0,
};

type setCommentCount = {
	commentCount: number;
};

export const SET_POST_COMMENT_COUNT = 'post/comment/SET_POST_COMMENT_COUNT';
export const GET_POST_COMMENT_COUNT = 'post/comment/GET_POST_COMMENT_COUNT';

export const setPostCommentList = createAction(SET_POST_COMMENT_COUNT)<setCommentCount>();
export const getPostCommentList = createAction(GET_POST_COMMENT_COUNT)<string>();

const actions = {
	setPostCommentList,
	getPostCommentList,
};

type PostCommentCountAction = ActionType<typeof actions>;

export default createReducer<PostCommentCountState, PostCommentCountAction>(initialState, {
	[SET_POST_COMMENT_COUNT]: (state, action) => ({
		...state,
		commentCount: action.payload.commentCount,
	}),

	[GET_POST_COMMENT_COUNT]: (state) => ({
		...state,
		commentCount: state.commentCount,
	}),
});
