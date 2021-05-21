import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { FacebookLoginRequest, UserInfo } from 'store/types/auth.types';

type GithubAuthState = {
	loading?: boolean;
	isLoginSuccess: boolean;
	profileImage: string;
	// token: string;
	successCB: () => null;
	failCB: (memberName: string, memberId: string, githubId: string) => void;
	authLoginErrorMsg: string;
};

const initialState: GithubAuthState = {
	loading: false,
	isLoginSuccess: false,
	authLoginErrorMsg: '',
	profileImage: '',
	// token: '',
	failCB: () => null,
	successCB: () => null,
};

export const FACEBOOK_USER_UPDATE_PROFILE_IMAGE = 'facebook_auth/GITHUB_USER_UPDATE_PROFILE_IMAGE';
export const FACEBOOK_AUTH_LOGIN_ERROR_MSG = 'facebook_auth/GITHUB_AUTH_LOGIN_ERROR_MSG';
export const FACEBOOK_AUTH_LOGIN_REQUEST = 'facebook_auth/GITHUB_AUTH_LOGIN_REQUEST';
export const FACEBOOK_AUTH_LOGIN_SUCCESS = 'facebook_auth/GITHUB_AUTH_LOGIN_SUCCESS';
export const FACEBOOK_AUTH_LOGIN_FAILURE = 'facebook_auth/GITHUB_AUTH_LOGIN_FAILURE';

export const facebookUserUpdateProfileImage = createAction(FACEBOOK_USER_UPDATE_PROFILE_IMAGE)<string>();
export const onFacebookAuthLogin = createAsyncAction(
	FACEBOOK_AUTH_LOGIN_REQUEST,
	FACEBOOK_AUTH_LOGIN_SUCCESS,
	FACEBOOK_AUTH_LOGIN_FAILURE
)<FacebookLoginRequest, UserInfo, AxiosError>();

const actions = {
	onFacebookAuthLogin,
	facebookUserUpdateProfileImage,
};

type GihubAuthAction = ActionType<typeof actions>;

export default createReducer<GithubAuthState, GihubAuthAction>(initialState, {
	[FACEBOOK_AUTH_LOGIN_REQUEST]: (state) => ({
		...state,
		loading: true,
	}),

	[FACEBOOK_AUTH_LOGIN_SUCCESS]: (state, action) => ({
		...state,
		userInfo: action.payload,
		loading: false,
		isLoginSucces: true,
	}),

	[FACEBOOK_AUTH_LOGIN_FAILURE]: (state) => ({
		...state,
		loading: false,
		isLoginSuccess: false,
	}),

	[FACEBOOK_USER_UPDATE_PROFILE_IMAGE]: (state, action) => ({
		...state,
		profileImage: action.payload,
		loading: false,
	}),
});
