export type AuthLogin = {
	memberId: string;
	pw: string;
	successCB?: () => null;
};

export type LoginSuccess = {
	token: string;
};

export type GitHubLoginRequest = {
	code: string;
	successCB?: () => null;
	failCB?: (memberName: string, memberId: string, githubId: string, avatarUrl: string) => any;
};

export type TypeDecoded = {
	profileImage: string;
	memberId: string;
	accessLevel: number;
};

export type UserInfo = {
	accessLevel: number;
	profileImage?: string;
	introduce?: string;
	memberName: string;
	memberId: string;
	email: string;
	displayEmail: string;
	followers: number;
	followings: number;
};

export type UserRegisterWithGithubRequest = {
	memberId: string;
	memberName: string;
	introduce?: string;
	githubId: string;
	avatarUrl?: string;
	successCB?: () => null;
	failCB?: () => void;
};

export type UserRegisterRequest = {
	memberId: string;
	memberName: string;
	introduce?: string;
	code: string;
	pw: string;
	successCB?: () => null;
	failCB?: () => void;
};
