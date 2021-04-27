import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AuthLogin } from '../types/auth.types';

type AuthState = {
	loading?: boolean;
	isLoginSuccess: boolean;
	successCB: () => null;
	profileImage: string;
	// token: string;
	authLoginErrorMsg: string;
};

const initialState: AuthState = {
	loading: false,
	isLoginSuccess: false,
	authLoginErrorMsg: '',
	profileImage: '',
	// token: '',
	successCB: () => null,
};

export const AUTH_LOGIN_ERROR_MSG = 'auth/AUTH_LOGIN_ERROR_MSG';
export const AUTH_LOGIN_REQUEST = 'auth/AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'auth/AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'auth/AUTH_LOGIN_FAILURE';
export const UPDATE_PROFILE_IMAGE = 'auth/UPDATE_PROFILE_IMAGE';

export const updateUserProfileImage = createAction(UPDATE_PROFILE_IMAGE)<string>();
export const setLoginErrorMsg = createAction(AUTH_LOGIN_ERROR_MSG)<string>();
export const onAuthLogin = createAsyncAction(AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE)<
	AuthLogin,
	undefined,
	AxiosError
>();

const actions = {
	onAuthLogin,
	setLoginErrorMsg,
	updateUserProfileImage,
};

type AuthAction = ActionType<typeof actions>;

export default createReducer<AuthState, AuthAction>(initialState, {
	[AUTH_LOGIN_REQUEST]: (state) => ({
		...state,
		loading: true,
	}),

	[AUTH_LOGIN_SUCCESS]: (state) => ({
		...state,
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

	[UPDATE_PROFILE_IMAGE]: (state, action) => ({
		...state,
		profileImage: action.payload,
	}),
});
