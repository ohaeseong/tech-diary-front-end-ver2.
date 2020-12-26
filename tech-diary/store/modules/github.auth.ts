import { createAsyncAction, ActionType, createReducer, createAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { GitHubLoginRequest } from 'store/types/auth.types';

type GithubAuthState = {
    loading?: boolean,
    isLoginSuccess: boolean,
    successCB: Function,
    authLoginErrorMsg: string;
}

const initialState: GithubAuthState = {
    loading: false,
    isLoginSuccess: false,
    authLoginErrorMsg: '',
    successCB: () => {},
}

export const GITHUB_AUTH_LOGIN_ERROR_MSG = 'github_auth/GITHUB_AUTH_LOGIN_ERROR_MSG';
export const GITHUB_AUTH_LOGIN_REQUEST = 'github_auth/GITHUB_AUTH_LOGIN_REQUEST';
export const GITHUB_AUTH_LOGIN_SUCCESS = 'github_auth/GITHUB_AUTH_LOGIN_SUCCESS';
export const GITHUB_AUTH_LOGIN_FAILURE = 'github_auth/GITHUB_AUTH_LOGIN_FAILURE';

// export const setLoginErrorMsg = createAction(AUTH_LOGIN_ERROR_MSG)<string>();
export const onGithubAuthLogin = createAsyncAction(
    GITHUB_AUTH_LOGIN_REQUEST,
    GITHUB_AUTH_LOGIN_SUCCESS,
    GITHUB_AUTH_LOGIN_FAILURE
)<GitHubLoginRequest, undefined, AxiosError>();

const actions = {
    onGithubAuthLogin,
};

type GihubAuthAction = ActionType<typeof actions>;

export default createReducer<GithubAuthState, GihubAuthAction>(initialState, {
    [GITHUB_AUTH_LOGIN_REQUEST]: (state) => ({
        ...state,
        loading: true,
    }),

    [GITHUB_AUTH_LOGIN_SUCCESS]: (state) => ({
        ...state,
        loading: false,
        isLoginSucces: true,
    }),

    [GITHUB_AUTH_LOGIN_FAILURE]: (state) => ({
        ...state,
        loading: false,
        isLoginSuccess: false,
    }),
});

