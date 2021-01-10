/* eslint-disable camelcase */
export type getPostList = {
	limit: string;
	category: string;
	kinds?: string;
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
	member: Member;
};

export type PostDetail = {
	id: string;
	title: string;
	contents: string;
	memberId: string;
	thumbnailAddress: string;
	series?: string;
	category: string;
	createTime: string;
	commentData: Comment[];
	tagList: Tag[];
	like: number;
	member: Member;
};

export type Comment = {
	idx: number;
	comment_txt: string;
	member_id: string;
	post_id: string;
	create_date: string;
};

export type Tag = {
	idx: number;
	tagName: string;
	postId: string;
};

export type Member = {
	memberId: string;
	memberName: string;
	profileImage: string;
	accessLevel?: number;
};
