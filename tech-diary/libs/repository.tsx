import axios from 'axios';
import { server } from 'config/config';
import { getStorage } from './storage';

export const requestPostLike = async (req: { postId: string }) => {
	const { postId } = req;
	const token = getStorage('tech-token');
	await axios
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
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw err;
		});
};

export const requestWriteComment = (req: { postId: string; text: string }) => {
	const { postId, text } = req;
	const token = getStorage('tech-token');

	axios
		.post(
			`${server.host}/post/comment`,
			{
				commentTxt: text,
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
