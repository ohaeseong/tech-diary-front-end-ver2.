import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { UserRegisterWithSocialRequest } from 'store/types/auth.types';

type RegisterUserWithSocialState = {
	loading?: boolean;
	successCB: () => null;
	failCB: () => void;
	authRegisterErrorMsg: string;
};

const initialState: RegisterUserWithSocialState = {
	loading: false,
	authRegisterErrorMsg: '',
	failCB: () => null,
	successCB: () => null,
};

export const SOCIAL_REGISTER_USER_ERROR_MSG = 'register_auth/GITHUB_REGISTER_USER_ERROR_MSG';
export const SOCIAL_REGISTER_REQUEST = 'register_auth/GITHUB_REGISTER_REQUEST';
export const SOCIAL_REGISTER_USER_SUCCESS = 'register_auth/GITHUB_REGISTER_USER_SUCCESS';
export const SOCIAL_REGISTER_USER_FAILURE = 'register_auth/GITHUB_REGISTER_USER_FAILURE';

export const setRegisterErrorMsg = createAction(SOCIAL_REGISTER_USER_ERROR_MSG)<string>();
export const onSocialAuthRegister = createAsyncAction(
	SOCIAL_REGISTER_REQUEST,
	SOCIAL_REGISTER_USER_SUCCESS,
	SOCIAL_REGISTER_USER_FAILURE
)<UserRegisterWithSocialRequest, undefined, AxiosError>();

const actions = {
	onSocialAuthRegister,
	setRegisterErrorMsg,
};

type GihubAuthRegisterAction = ActionType<typeof actions>;

export default createReducer<RegisterUserWithSocialState, GihubAuthRegisterAction>(initialState, {
	[SOCIAL_REGISTER_REQUEST]: (state) => ({
		...state,
		loading: true,
	}),

	[SOCIAL_REGISTER_USER_SUCCESS]: (state) => ({
		...state,
		loading: false,
	}),

	[SOCIAL_REGISTER_USER_FAILURE]: (state) => ({
		...state,
		loading: false,
	}),
});
