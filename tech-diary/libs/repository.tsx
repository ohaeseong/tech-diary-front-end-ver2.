import axios from 'axios';
import { server } from 'config/config';

export const requestPostLike = (req: { postId: string; token: string }) =>
	axios
		.post(
			`${server.host}/post/like`,
			{
				postId: req.postId,
			},
			{
				headers: {
					token: req.token,
				},
			}
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw err;
		});

export const requestWriteComment = (req: { postId: string; text: string; token: string }) =>
	axios
		.post(
			`${server.host}/post/comment`,
			{
				commentTxt: req.text,
				postId: req.postId,
			},
			{
				headers: {
					token: req.token,
				},
			}
		)
		.catch((error) => {
			throw error;
		});

export const requestGetComment = (req: { postId: string }) =>
	axios
		.get(`${server.host}/post/comment`, {
			params: {
				postId: req.postId,
			},
		})
		.catch((error) => {
			throw error;
		});
