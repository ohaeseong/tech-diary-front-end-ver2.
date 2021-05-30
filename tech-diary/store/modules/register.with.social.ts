import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { UserRegisterWithSocialRequest } from 'store/types/auth.types';

type RegisterSocialUserState = {
	loading?: boolean;
	successCB: () => null;
	failCB: () => void;
	authRegisterErrorMsg: string;
};

const initialState: RegisterSocialUserState = {
	loading: false,
	authRegisterErrorMsg: '',
	failCB: () => null,
	successCB: () => null,
};

export const AUTH_REGISTER_SOCIAL_ERROR_MSG = 'register_social_auth/AUTH_REGISTER_SOCIAL_ERROR_MSG';
export const AUTH_REGISTER_SOCIAL_REQUEST = 'register_social_auth/AUTH_REGISTER_SOCIAL_REQUEST';
export const AUTH_REGISTER_SOCIAL_SUCCESS = 'register_social_auth/AUTH_REGISTER_SOCIAL_SUCCESS';
export const AUTH_REGISTER_SOCIAL_FAILURE = 'register_social_auth/AUTH_REGISTER_SOCIAL_FAILURE';

export const setSocialAuthRegisterErrorMsg = createAction(AUTH_REGISTER_SOCIAL_ERROR_MSG)<string>();
export const onSocialAuthRegister = createAsyncAction(
	AUTH_REGISTER_SOCIAL_REQUEST,
	AUTH_REGISTER_SOCIAL_SUCCESS,
	AUTH_REGISTER_SOCIAL_FAILURE
)<UserRegisterWithSocialRequest, undefined, AxiosError>();

const actions = {
	onSocialAuthRegister,
	setSocialAuthRegisterErrorMsg,
};

type SocialAuthRegisterAction = ActionType<typeof actions>;

export default createReducer<RegisterSocialUserState, SocialAuthRegisterAction>(initialState, {
	[AUTH_REGISTER_SOCIAL_REQUEST]: (state) => ({
		...state,
		loading: true,
	}),

	[AUTH_REGISTER_SOCIAL_SUCCESS]: (state) => ({
		...state,
		loading: false,
	}),

	[AUTH_REGISTER_SOCIAL_FAILURE]: (state) => ({
		...state,
		loading: false,
	}),

	[AUTH_REGISTER_SOCIAL_ERROR_MSG]: (state, action) => ({
		...state,
		authRegisterErrorMsg: action.payload,
	}),
});
