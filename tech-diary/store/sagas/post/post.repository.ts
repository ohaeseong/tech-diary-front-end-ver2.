import axios from 'axios';
import { server } from 'config/config';
import { getCommentList } from 'store/modules/post.comment';
import { getPostList } from 'store/types/post.types';

class postRepository {
	public async getPostListReq(req: getPostList) {
		return axios
			.get(`${server.host}/post`, {
				params: {
					category: req.category,
					limit: req.limit,
					kinds: req.kinds,
				},
			})
			.catch((error) => error.response);
	}

	public async getPostCommentList(req: getCommentList) {
		return axios
			.get(`${server.host}/post/comment`, {
				params: {
					postId: req.postId,
				},
			})
			.catch((error) => error.response);
	}
}

export default new postRepository();
