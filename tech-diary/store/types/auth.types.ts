export type AuthLogin = {
    memberId: string,
    pw: string,
    successCB?: () => {},
}