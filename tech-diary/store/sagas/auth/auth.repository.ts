import axios from 'axios';
import { server } from 'config/config';
import { AuthLogin, FacebookLoginRequest, GitHubLoginRequest, UserRegisterRequest, UserRegisterWithSocialRequest } from 'store/types/auth.types';
// import {  } from 'store/'

class authRepository {
	public async authLogInReq(req: AuthLogin) {
		return axios
			.post(`${server.host}/auth/login`, {
				memberId: req.memberId,
				pw: req.pw,
			})
			.catch((error) => error.response);
	}

	public async loginWithGithub(req: GitHubLoginRequest) {
		return axios
			.post(`${server.host}/auth/login/with-github`, {
				code: req.code,
			})
			.catch((error) => error.response);
	}

	public async loginWithFacebook(req: FacebookLoginRequest) {
		return axios
			.post(`${server.host}/auth/login/with-facebook`, {
				userID: req.userId,
				accessToken: req.accessToken,
				userName: req.userName,
			})
			.catch((error) => error.response);
	}

	public async registerWithSocial(req: UserRegisterWithSocialRequest) {
		return axios
			.post(`${server.host}/auth/register/with-social`, {
				memberId: req.memberId,
				memberName: req.memberName,
				socialId: req.socialId,
				profileImage: req.profileImage,
			})
			.catch((error) => error.response);
	}

	public async registerAuth(req: UserRegisterRequest) {
		return axios
			.post(`${server.host}/auth/register/`, {
				memberId: req.memberId,
				memberName: req.memberName,
				intro: req.introduce,
				code: req.code,
				pw: req.pw,
			})
			.catch((error) => error.response);
	}
}

export default new authRepository();
