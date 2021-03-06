import axios from 'axios';
import { server } from 'config/config';
import {
	AuthLogin,
	FacebookLoginRequest,
	SocialLoginRequest,
	UserRegisterRequest,
	UserRegisterWithSocialRequest,
} from 'store/types/auth.types';
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

	public async socialLogin(req: SocialLoginRequest) {
		return axios
			.get(`${server.host}/auth/redirect/social`, {
				params: {
					social: req.social,
					redirectUri: req.redirectUri
				},
				headers: { 'Access-Control-Allow-Origin': '*' },
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
				email: req.email,
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

	public async getUserInfo(req: { memberId: string }) {
		return axios
			.get(`${server.host}/auth/user-info?memberId=${req.memberId}`)
			.catch((error) => error.response);
	}
}

export default new authRepository();
