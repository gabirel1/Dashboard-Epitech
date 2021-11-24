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
    facebook_mail?: string,
    apple_mail?: string,
    office_mail?: string,
    username?: string,
    password?: string,
};