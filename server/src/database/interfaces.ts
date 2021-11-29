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

export interface IntraEpitechUser {
    login: string,
    firstname: string,
    lastname: string,
    profilePicture: string,
    promo: string,
    location: string,
    semesterCode: string,
    credits: number,
    gpa: number,
};