export type ILoginUser = {
    email: string;
    password:string;
}
export type ILoginUserResponse = {
    accessToken:string;
    refreshToken?:string
}
export type IRefreshTokenResponse = {
    acceToken:string
}