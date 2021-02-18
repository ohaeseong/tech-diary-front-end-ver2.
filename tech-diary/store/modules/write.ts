import { createReducer, deprecated } from 'typesafe-actions';

const { createStandardAction } = deprecated;

type writeState = {
	postId: string;
};

const initialState: writeState = {
	postId: '',
};

export const SET_WRITE_POST_ID = 'write/SET_WRITE_POST_ID';

export const setWritePostId = createStandardAction(SET_WRITE_POST_ID)<string>();
type SetWritePostId = ReturnType<typeof setWritePostId>;

export default createReducer(initialState, {
	[SET_WRITE_POST_ID]: (state, action: SetWritePostId) => ({
		...state,
		postId: action.payload,
		isTemp: true,
	}),
});
