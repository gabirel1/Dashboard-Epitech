export interface OauthInformations {
    test?: string,
    googleMail?: string,
    officeMail?: string,
    appleMail?: string,
};

export interface User extends OauthInformations {
    id: number,
    mail: string,
    username: string,
    password?: string,
    token: string,
};

export interface UserInformations {
    mail?: string,
    google_mail?: string,
    google_token?: string,
    facebook_mail?: string,
    facebook_token?: string,
    apple_mail?: string,
    apple_token?: string,
    office_mail?: string,
    office_token?: string,
    username?: string,
    password?: string,
};