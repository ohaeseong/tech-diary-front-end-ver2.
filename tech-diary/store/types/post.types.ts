export type getPostList = {
	page: string;
	category: string;
	successCB?: () => {};
};

export type PostList = {
	posts: Array<Post>;
};

export type Post = {
	id: string;
	title: string;
	contents: string;
	thumbnail_address: string;
	series?: string;
	category: string;
	create_time: string;
};
