import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AuthLogin, LoginSuccess } from '../types/auth.types';

type AuthState = {
	loading?: boolean;
	isLoginSuccess: boolean;
	successCB: () => null;
	// token: string;
	authLoginErrorMsg: string;
};

const initialState: AuthState = {
	loading: false,
	isLoginSuccess: false,
	authLoginErrorMsg: '',
	// token: '',
	successCB: () => null,
};

export const AUTH_LOGIN_ERROR_MSG = 'auth/AUTH_LOGIN_ERROR_MSG';
export const AUTH_LOGIN_REQUEST = 'auth/AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'auth/AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'auth/AUTH_LOGIN_FAILURE';

export const setLoginErrorMsg = createAction(AUTH_LOGIN_ERROR_MSG)<string>();
export const onAuthLogin = createAsyncAction(AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE)<
	AuthLogin,
	undefined,
	AxiosError
>();

const actions = {
	onAuthLogin,
	setLoginErrorMsg,
};

type AuthAction = ActionType<typeof actions>;

export default createReducer<AuthState, AuthAction>(initialState, {
	[AUTH_LOGIN_REQUEST]: (state) => ({
		...state,
		loading: true,
	}),

	[AUTH_LOGIN_SUCCESS]: (state, action) => ({
		...state,
		// token: action.payload.token,
		loading: false,
		isLoginSucces: true,
	}),

	[AUTH_LOGIN_FAILURE]: (state) => ({
		...state,
		loading: false,
		isLoginSuccess: false,
	}),

	[AUTH_LOGIN_ERROR_MSG]: (state, action) => ({
		...state,
		authLoginErrorMsg: action.payload,
	}),
});
