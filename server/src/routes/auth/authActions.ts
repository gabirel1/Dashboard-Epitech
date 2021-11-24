import express from 'express';
import { lstat } from 'fs';
import { UserInformations } from '../../database/interfaces';
import { addUsers, getUsers } from '../../database/databaseActions';

export const handleOAuthUsers = async (req: express.Request, res: express.Response) => {
    const { mail, google_mail, facebook_mail, apple_mail, office_mail, username, password } = req.body;
    const infos: UserInformations = {
        mail,
        google_mail,
        facebook_mail,
        apple_mail,
        office_mail,
        username,
        password,
    };
    

}

export const handleOAuthUsersAction = async (infos: UserInformations, req: express.Request, res: express.Response) => {
    const user = await checkUserExists(infos);

    if (user === []) {
        await addUsers(infos, (err: any, result: any) => {
            if (err) {
                console.debug('[handleOAuthUsersAction] | error[addUsers] = ', err);
            } else {
                console.debug('[handleOAuthUsersAction] | result[addUsers] = ', result);
            }
        });
    } else {
        console.debug('[handleOAuthUsersAction] | user = ', user);
    }
};

const checkUserExists = async (infos: UserInformations): Promise<any> => {
    getUsers(infos, (err: any, result: any) => {
        if (err) {
            console.debug('[checkUserExists] | error[getUsers] = ', err);
            return [];
        } else {
            console.debug('result1', result);
            console.debug('result1[0]', result[0]);
            return (result![0]) ? result[0] : [];
        }
    });
};