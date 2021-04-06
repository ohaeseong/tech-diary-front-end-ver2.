import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { UserRegisterWithGithubRequest } from 'store/types/auth.types';

type RegisterUserWithGithubState = {
	loading?: boolean;
	successCB: () => null;
	failCB: () => void;
	authRegisterErrorMsg: string;
};

const initialState: RegisterUserWithGithubState = {
	loading: false,
	authRegisterErrorMsg: '',
	failCB: () => null,
	successCB: () => null,
};

export const GITHUB_REGISTER_USER_ERROR_MSG = 'register_auth/GITHUB_REGISTER_USER_ERROR_MSG';
export const GITHUB_REGISTER_REQUEST = 'register_auth/GITHUB_REGISTER_REQUEST';
export const GITHUB_REGISTER_USER_SUCCESS = 'register_auth/GITHUB_REGISTER_USER_SUCCESS';
export const GITHUB_REGISTER_USER_FAILURE = 'register_auth/GITHUB_REGISTER_USER_FAILURE';

export const setRegisterErrorMsg = createAction(GITHUB_REGISTER_USER_ERROR_MSG)<string>();
export const onGithubAuthRegister = createAsyncAction(
	GITHUB_REGISTER_REQUEST,
	GITHUB_REGISTER_USER_SUCCESS,
	GITHUB_REGISTER_USER_FAILURE
)<UserRegisterWithGithubRequest, undefined, AxiosError>();

const actions = {
	onGithubAuthRegister,
	setRegisterErrorMsg,
};

type GihubAuthRegisterAction = ActionType<typeof actions>;

export default createReducer<RegisterUserWithGithubState, GihubAuthRegisterAction>(initialState, {
	[GITHUB_REGISTER_REQUEST]: (state) => ({
		...state,
		loading: true,
	}),

	[GITHUB_REGISTER_USER_SUCCESS]: (state) => ({
		...state,
		loading: false,
	}),

	[GITHUB_REGISTER_USER_FAILURE]: (state) => ({
		...state,
		loading: false,
	}),
});
