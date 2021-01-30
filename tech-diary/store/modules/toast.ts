import { ActionType, createReducer, createAction } from 'typesafe-actions';

type ToastState = {
	isCall: boolean;
	text: string;
};

const initialState: ToastState = {
	isCall: false,
	text: '',
};

export const SHOW_TOAST = 'toast/SHOW_TOAST';
export const DROP_TOAST = 'toast/DROP_TOAST';

type ShowToast = {
	text: string;
};

export const showToast = createAction(SHOW_TOAST)<ShowToast>();
export const dropToast = createAction(DROP_TOAST)<string>();

const actions = {
	showToast,
	dropToast,
};

export type ToastAction = ActionType<typeof actions>;

export default createReducer<ToastState, ToastAction>(initialState, {
	[SHOW_TOAST]: (state, action) => ({
		...state,
		text: action.payload.text,
		isCall: true,
	}),

	[DROP_TOAST]: (state) => ({
		...state,
		isCall: false,
		text: '',
	}),
});
