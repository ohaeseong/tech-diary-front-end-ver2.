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
	writer: string;
	thumbnail_address: string;
	series?: string;
	category: string;
	create_time: string;
};
