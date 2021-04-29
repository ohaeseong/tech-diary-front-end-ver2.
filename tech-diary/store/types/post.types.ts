export type getPostList = {
	limit: string;
	category: string;
	kinds?: string;
	successCB?: () => null;
};

export type PostList = {
	posts: Array<Post>;
};

export type CreatePost = {
	title: string;
	contents: string;
	token: string;
	tags?: Array<string>;
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
	comments: Comment[];
	like: number;
	member: Member;
	commentCount: number;
	url: string;
	intro: string;

	tagList?: {
		tagData: Tag[];
	};
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
	commentList: {
		commentData: Comment[];
	};
	tagList: {
		tagData: Tag[];
	};
	like: Like[];
	member: Member;
	commentCount: number;
};

export type PostUpdate = {
	id: string;
	title: string;
	contents: string;
	token: string;
	tags?: Array<string>;
};

export type Comment = {
	idx: number;
	commentTxt: string;
	memberId: string;
	postId: string;
	createDate: string;
	member: Member;
	replyComments: Comment[];
};

export type Tag = {
	idx: number;
	tagName: string;
	postId: string;
};

export type Like = {
	idx: number;
	postId: string;
	memberId: string;
};

export type Member = {
	memberId: string;
	memberName: string;
	profileImage: string;
	accessLevel?: number;
};
