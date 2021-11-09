export interface OauthInformations {
    test: string,
    googleMail: string,
    officeMail: string,
    appleMail: string,
};

export interface User extends OauthInformations {
    id: number,
    mail: string,
    password?: string,
    token: string,
};