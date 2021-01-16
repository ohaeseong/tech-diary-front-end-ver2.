import axios from 'axios';
import { server } from 'config/config';
import { getStorage } from 'libs/storage';
import { useCallback, useEffect, useState } from 'react';

export function useRequest(request: any, params?: any) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState();

	const onRequest = useCallback(async () => {
		try {
			setLoading(true);
			const response = await request(params);
			setData(response.data);
		} catch (error) {
			setLoading(false);
		}

		setLoading(false);
	}, []);

	useEffect(() => {
		onRequest();
	}, []);

	return [data, loading];
}

export const requestPostLike = (req: { postId: string }) => {
	const { postId } = req;
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

export const requestWriteComment = (req: { postId: string; text: string }) => {
	const { postId, text } = req;
	const token = getStorage('tech-token');

	console.log(req);

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

// export const requestPostBookMark = (params) => {};
