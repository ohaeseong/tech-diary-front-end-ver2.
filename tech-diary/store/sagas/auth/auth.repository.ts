import axios from 'axios';
import { server } from 'config/config';
import { AuthLogin, GitHubLoginRequest } from 'store/types/auth.types';
// import {  } from 'store/'

class authRepository {
    public async authLogInReq(req: AuthLogin) {
        return axios.post(`${server.host}/auth/login`, {
            memberId: req.memberId,
            pw: req.pw,
        })
        .catch((error) => error.response);
    }

    public async loginWithGithub(req: GitHubLoginRequest) {
        return axios.post(`${server.host}/auth/login/with-github`, {
            code: req.code,
        })
        .catch((error) => error.response);
    }
}

export default new authRepository();