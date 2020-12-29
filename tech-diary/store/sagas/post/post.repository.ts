import axios from 'axios';
import { server } from 'config/config';
import { getPostList } from 'store/types/post.types';

class postRepository {
	public async getPostListReq(req: getPostList) {
		return axios
			.get(`${server.host}/post`, {
				params: {
					category: req.category,
					page: req.page,
				},
			})
			.catch((error) => error.response);
	}
}

export default new postRepository();
