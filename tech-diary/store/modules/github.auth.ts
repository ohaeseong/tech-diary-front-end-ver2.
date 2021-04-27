import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { GitHubLoginRequest, UserInfo } from 'store/types/auth.types';

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

export const GITHUB_USER_UPDATE_PROFILE_IMAGE = 'github_auth/GITHUB_USER_UPDATE_PROFILE_IMAGE';
export const GITHUB_AUTH_LOGIN_ERROR_MSG = 'github_auth/GITHUB_AUTH_LOGIN_ERROR_MSG';
export const GITHUB_AUTH_LOGIN_REQUEST = 'github_auth/GITHUB_AUTH_LOGIN_REQUEST';
export const GITHUB_AUTH_LOGIN_SUCCESS = 'github_auth/GITHUB_AUTH_LOGIN_SUCCESS';
export const GITHUB_AUTH_LOGIN_FAILURE = 'github_auth/GITHUB_AUTH_LOGIN_FAILURE';

export const githubUserUpdateProfileImage = createAction(GITHUB_USER_UPDATE_PROFILE_IMAGE)<string>();
export const onGithubAuthLogin = createAsyncAction(
	GITHUB_AUTH_LOGIN_REQUEST,
	GITHUB_AUTH_LOGIN_SUCCESS,
	GITHUB_AUTH_LOGIN_FAILURE
)<GitHubLoginRequest, UserInfo, AxiosError>();

const actions = {
	onGithubAuthLogin,
	githubUserUpdateProfileImage,
};

type GihubAuthAction = ActionType<typeof actions>;

export default createReducer<GithubAuthState, GihubAuthAction>(initialState, {
	[GITHUB_AUTH_LOGIN_REQUEST]: (state) => ({
		...state,
		loading: true,
	}),

	[GITHUB_AUTH_LOGIN_SUCCESS]: (state, action) => ({
		...state,
		userInfo: action.payload,
		loading: false,
		isLoginSucces: true,
	}),

	[GITHUB_AUTH_LOGIN_FAILURE]: (state) => ({
		...state,
		loading: false,
		isLoginSuccess: false,
	}),

	[GITHUB_USER_UPDATE_PROFILE_IMAGE]: (state, action) => ({
		...state,
		profileImage: action.payload,
		loading: false,
	}),
});
