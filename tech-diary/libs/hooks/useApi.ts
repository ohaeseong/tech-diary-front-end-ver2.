import axios from 'axios';
import { server } from 'config/config';
import { getStorage } from 'libs/storage';

export const useRequest = async (request: any, params?: any) => {
	try {
		const response = await request(params);

		return response;
	} catch (error) {}
};

type PostLikeRequest = {
	postId: string;
};

export const requestPostLike = (postId: PostLikeRequest) => {
	const token = getStorage('tech-token');

	axios
		.post(
			`${server.host}/post/like`,
			{
				postId,
			},
			{
				headers: {
					token,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => {
			throw err;
		});
};

export const requestPostBookMark = (params) => {};
