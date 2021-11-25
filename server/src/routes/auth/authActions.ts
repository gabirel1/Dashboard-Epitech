import express from 'express';
import { UserInformations } from '../../database/interfaces';
import { addUsers, getUsers, updateUserAuthToken } from '../../database/databaseActions';
import jwt from 'jsonwebtoken';

export const handleOAuthUsers = async (req: express.Request, res: express.Response) => {
    const type: string = req.params.type;
    const { givenToken } = req.body;
    let user: { type: string, userJson: any } = { type: '', userJson: {} };
    let response: Response;

    switch (type) {
        case 'google_user':
            response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                headers: {
                    Authorization: `Bearer ${givenToken}`
                },
                method: 'GET',
                mode: 'no-cors',
            });
            let googleUser = await response.json();
            user = { type: 'google_user', userJson: googleUser };
            break;
        case 'facebook_user':
            response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                headers: {
                    Authorization: `Bearer ${givenToken}`
                },
                method: 'GET',
                mode: 'no-cors',
            });
            let facebookUser = await response.json();
            user = { type: 'facebook_user', userJson: facebookUser };
            break;
        case 'apple_user':
            response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                headers: {
                    Authorization: `Bearer ${givenToken}`
                },
                method: 'GET',
                mode: 'no-cors',
            });
            let appleUser = await response.json();
            user = { type: 'apple_user', userJson: appleUser };
            break;
        case 'office_user':
            response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                headers: {
                    Authorization: `Bearer ${givenToken}`
                },
                method: 'GET',
                mode: 'no-cors',
            });
            let officeUser = await response.json();
            user = { type: 'office_user', userJson: officeUser };
            break;
        default:
            return res.status(400).json({ message: 'Bad request' });
    }

    const infos: UserInformations = {
        mail: undefined,
        google_mail: (user.type === 'google_user') ? user.userJson.email : undefined,
        google_token: (user.type === 'google_user') ? givenToken : undefined,
        facebook_mail: (user.type === 'facebook_user') ? user.userJson.email : undefined,
        facebook_token: (user.type === 'facebook_user') ? givenToken : undefined,
        apple_mail: (user.type === 'apple_user') ? user.userJson.email : undefined,
        apple_token: (user.type === 'apple_user') ? givenToken : undefined,
        office_mail: (user.type === 'office_user') ? user.userJson.email : undefined,
        office_token: (user.type === 'office_user') ? givenToken : undefined,
        username: undefined,
        password: undefined,
    };

    const result = await handleOAuthUsersAction(infos);

    if (result.error === true) {
        return res.status(400).json({
            error: result.error,
            message: result.message,
        });
    }
    if (result.message === 'User already exists') {
        const expiresIn: number = Number(process.env.EXPIRE_TIME) || 60 * 60;
        const payload = {
            mail: (user.type === 'google_user') ? user.userJson.email : (user.type === 'facebook_user') ? user.userJson.email : (user.type === 'apple_user') ? user.userJson.email : (user.type === 'office_user') ? user.userJson.email : "none",
        };
        const token: string = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: expiresIn }
        );
        updateUserAuthToken(infos, token, (err: any, result: any) => {
            if (err) {
                console.debug('[handleOAuthUsersAction] | error[updateUserAuthToken] = ', err);
            } else {
                console.debug('[handleOAuthUsersAction] | result[updateUserAuthToken] = ', result);
            }
        });
        return res.status(200).json({ error: false, message: "user logged in", expiresIn: expiresIn, token: token, result: result.result });
    }
    return res.status(200).json({ error: false, message: "user created", result: result.result });
}

export const handleOAuthUsersAction = async (infos: UserInformations) => {
    const user = await checkUserExists(infos);

    if (user === []) {
        await addUsers(infos, (err: any, result: any) => {
            if (err) {
                console.debug('[handleOAuthUsersAction] | error[addUsers] = ', err);
                return { error: true, message: "username or email already exists" };
            } else {
                console.debug('[handleOAuthUsersAction] | result[addUsers] = ', result);
                return { error: false, message: "user created", result: result };
            }
        });
    } else {
        console.debug('[handleOAuthUsersAction] | user = ', user);
        return { error: false, message: "user already exists", result: user };
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