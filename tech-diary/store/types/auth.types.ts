export type AuthLogin = {
	memberId: string;
	pw: string;
	successCB?: () => null;
};

export type GitHubLoginRequest = {
	code: string;
	successCB?: () => null;
	failCB?: (memberName: string, memberId: string, githubId: string) => void;
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
