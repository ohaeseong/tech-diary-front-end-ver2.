import axios from 'axios';
import { server } from 'config/config';
import { AuthLogin } from 'store/types/auth.types';

class authRepository {
    public async authLogInReq(req: AuthLogin) {
        return axios.post(`${server.host}/auth/login`, {
            memberId: req.memberId,
            pw: req.pw,
        })
        .catch((error) => error.response);
    }
}

export default new authRepository();