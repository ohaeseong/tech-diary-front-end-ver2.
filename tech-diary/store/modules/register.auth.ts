import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { UserRegisterRequest } from 'store/types/auth.types';

type RegisterUserState = {
	loading?: boolean;
	successCB: () => null;
	failCB: () => void;
	authRegisterErrorMsg: string;
};

const initialState: RegisterUserState = {
	loading: false,
	authRegisterErrorMsg: '',
	failCB: () => null,
	successCB: () => null,
};

export const AUTH_REGISTER_USER_ERROR_MSG = 'register_auth/REGISTER_USER_ERROR_MSG';
export const AUTH_REGISTER_REQUEST = 'register_auth/AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'register_auth/AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILURE = 'register_auth/AUTH_REGISTER_FAILURE';

export const setRegisterErrorMsg = createAction(AUTH_REGISTER_USER_ERROR_MSG)<string>();
export const onAuthRegister = createAsyncAction(AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE)<
	UserRegisterRequest,
	undefined,
	AxiosError
>();

const actions = {
	onAuthRegister,
	setRegisterErrorMsg,
};

type AuthRegisterAction = ActionType<typeof actions>;

export default createReducer<RegisterUserState, AuthRegisterAction>(initialState, {
	[AUTH_REGISTER_REQUEST]: (state) => ({
		...state,
		loading: true,
	}),

	[AUTH_REGISTER_SUCCESS]: (state) => ({
		...state,
		loading: false,
	}),

	[AUTH_REGISTER_FAILURE]: (state) => ({
		...state,
		loading: false,
	}),

	[AUTH_REGISTER_USER_ERROR_MSG]: (state, action) => ({
		...state,
		authRegisterErrorMsg: action.payload,
	}),
});
