/* eslint-disable camelcase */
export type getPostList = {
	page: string;
	category: string;
	successCB?: () => null;
};

export type PostList = {
	posts: Array<Post>;
};

export type Post = {
	id: string;
	title: string;
	contents: string;
	memberId: string;
	thumbnailAddress: string;
	series?: string;
	category: string;
	createTime: string;
	commentList: number;
	like: number;
};
