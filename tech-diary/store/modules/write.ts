import { ActionType, createReducer, deprecated } from 'typesafe-actions';

const { createStandardAction } = deprecated;

const SET_INITIAL_BODY = 'write/SET_INITIAL_BODY';

export const SET_WRITE_POST_ID = 'write/SET_WRITE_POST_ID';

export const setWritePostId = createStandardAction(SET_WRITE_POST_ID)<string>();
export const setInitialBody = createStandardAction(SET_INITIAL_BODY)<string>();

type SetWritePostId = ReturnType<typeof setWritePostId>;
type SetInitialBody = ReturnType<typeof setInitialBody>;

export type WriteState = {
	postId: null | string;
	isTemp: boolean;
	initialBody: string;
};

const initialState: WriteState = {
	postId: null,
	isTemp: false,
	initialBody: '',
};

const actions = {
	setInitialBody,
	setWritePostId,
};

type WriteAction = ActionType<typeof actions>;

export default createReducer<WriteState, WriteAction>(initialState, {
	[SET_INITIAL_BODY]: (state, action: SetInitialBody) => ({
		...state,
		postId: action.payload,
		isTemp: true,
	}),

	[SET_WRITE_POST_ID]: (state, action: SetWritePostId) => ({
		...state,
		postId: action.payload,
		isTemp: true,
	}),
});
