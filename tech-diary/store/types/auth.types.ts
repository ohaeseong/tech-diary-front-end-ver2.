export type AuthLogin = {
    memberId: string,
    pw: string,
    successCB?: () => {},
}

export type GitHubLoginRequest = {
    code: string,
    successCB?: () => {},
}