export type AuthLogin = {
	memberId: string;
	pw: string;
	successCB?: () => null;
};

export type GitHubLoginRequest = {
	code: string;
	successCB?: () => null;
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
}