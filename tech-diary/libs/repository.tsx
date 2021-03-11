import axios from 'axios';
import { server } from 'config/config';
import { CreatePost, Post, PostUpdate } from 'store/types/post.types';

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
		.catch((err) => {
			throw err;
		});

export const requestWriteComment = (req?: { postId: string; text: string; token: string }) =>
	axios
		.post(
			`${server.host}/post/comment`,
			{
				commentTxt: req?.text,
				postId: req?.postId,
			},
			{
				headers: {
					token: req?.token,
				},
			}
		)
		.catch((error) => {
			throw error;
		});

export const requestGetComment = (req?: { postId: string }) =>
	axios
		.get(`${server.host}/post/comment`, {
			params: {
				postId: req?.postId,
			},
		})
		.catch((error) => {
			throw error;
		});

export const requestGetReplyComment = (req?: { commentIdx: number }) =>
	axios
		.get(`${server.host}/post/comment/reply`, {
			params: {
				replyCommentIdx: req?.commentIdx,
			},
		})
		.catch((error) => {
			throw error;
		});

export const requestWriteReplyComment = (req?: {
	text: string;
	postId: string;
	replyCommentIdx: number;
	token: string;
}) =>
	axios
		.post(
			`${server.host}/post/comment/reply`,
			{
				commentTxt: req?.text,
				postId: req?.postId,
				replyCommentIdx: req?.replyCommentIdx,
			},
			{
				headers: {
					token: req?.token,
				},
			}
		)
		.catch((error) => {
			throw error;
		});

export const requestDeleteComment = (req: { commentIdx: number; token: string }) =>
	axios
		.delete(`${server.host}/post/comment`, {
			headers: {
				token: req?.token,
			},
			params: {
				commentIdx: req?.commentIdx,
			},
		})
		.catch((error) => {
			throw error;
		});

export const requestDeleteReplyComment = (req: { commentIdx: number; token: string }) =>
	axios
		.delete(`${server.host}/post/comment/reply`, {
			headers: {
				token: req?.token,
			},
			params: {
				commentIdx: req?.commentIdx,
			},
		})
		.catch((error) => {
			throw error;
		});

export const requestUpdateComment = (req: { commentIdx: number; token: string; text: string }) =>
	axios
		.put(
			`${server.host}/post/comment`,
			{
				commentTxt: req?.text,
				commentIdx: req?.commentIdx,
			},
			{
				headers: {
					token: req?.token,
				},
			}
		)
		.catch((error) => {
			throw error;
		});

export const requestUpdateReplyComment = (req: { commentIdx: number; token: string; text: string }) =>
	axios
		.put(
			`${server.host}/post/comment/reply`,
			{
				commentTxt: req?.text,
				commentIdx: req?.commentIdx,
			},
			{
				headers: {
					token: req?.token,
				},
			}
		)
		.catch((error) => {
			throw error;
		});

export const requestCreatePost = (req: CreatePost) =>
	axios
		.post(
			`${server.host}/post`,
			{
				title: req.title,
				contents: req.contents,
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

export const requestUpdatePostForTemp = (req: PostUpdate) =>
	axios
		.put(
			`${server.host}/post`,
			{
				id: req.id,
				title: req.title,
				contents: req.contents,
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

export const requestGetDetail = (req: { id: string }) =>
	axios.get(`${server.host}/post/detail/${req.id}`).catch((error) => {
		throw error;
	});

export const requestPublishPost = (req: {
	id: string;
	token: string;
	kinds: string;
	category: string;
	slugUrl: string;
	thumbnailAddress: string;
	intro: string;
}) =>
	axios
		.put(
			`${server.host}/post/publish`,
			{
				id: req.id,
				kinds: req.kinds,
				category: req.category,
				slugUrl: req.slugUrl,
				thumbnailAddress: req.thumbnailAddress,
				intro: req.intro,
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

export const uploadImage = (req: { formData: Array<FormData>; token: string }) =>
	axios
		.post(`${server.host}/upload/img`, req.formData, {
			headers: {
				token: req.token,
			},
		})
		.catch((error) => {
			throw error;
		});
