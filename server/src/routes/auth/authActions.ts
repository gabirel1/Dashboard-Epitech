import express from 'express';
import { UserInformations } from '../../database/interfaces';
import { addUsers, getUsers, updateUserAuthToken } from '../../database/databaseActions';
import jwt from 'jsonwebtoken';
import axios, { AxiosResponse } from 'axios';
import { json } from 'stream/consumers';

export const handleOAuthUsers = async (req: express.Request, res: express.Response) => {
    const type: string = req.params.type;
    const { access_token } = req.body;
    let user: { type: string, userJson: any } = { type: '', userJson: {} };
    let response: AxiosResponse;

    switch (type) {
        case 'google_user':
            // response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            //     headers: {
            //         Authorization: `Bearer ${access_token}`
            //     },
            //     method: 'GET',
            //     mode: 'no-cors',
            // });
            console.log('bearer token == ', access_token);
            response = await axios({
                method: 'GET',
                url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                // mode: 'no-cors',
            });
            console.debug("response == ", response.data);
            let googleUser = response.data;
            user = { type: 'google_user', userJson: googleUser };
            break;
        case 'facebook_user':
            response = await axios({
                method: 'GET',
                url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                data: json,
                // mode: 'no-cors',
            });
            let facebookUser = response.data;
            user = { type: 'facebook_user', userJson: facebookUser };
            break;
        case 'apple_user':
            response = await axios({
                method: 'GET',
                url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                data: json,
                // mode: 'no-cors',
            });
            let appleUser = response.data;
            user = { type: 'apple_user', userJson: appleUser };
            break;
        case 'office_user':
            response = await axios({
                method: 'GET',
                url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                data: json,
                // mode: 'no-cors',
            });
            let officeUser = response.data;
            user = { type: 'office_user', userJson: officeUser };
            break;
        default:
            return res.status(400).json({ message: 'Bad request' });
    }

    const infos: UserInformations = {
        mail: undefined,
        google_mail: (user.type === 'google_user') ? user.userJson.email : undefined,
        google_token: (user.type === 'google_user') ? access_token : undefined,
        facebook_mail: (user.type === 'facebook_user') ? user.userJson.email : undefined,
        facebook_token: (user.type === 'facebook_user') ? access_token : undefined,
        apple_mail: (user.type === 'apple_user') ? user.userJson.email : undefined,
        apple_token: (user.type === 'apple_user') ? access_token : undefined,
        office_mail: (user.type === 'office_user') ? user.userJson.email : undefined,
        office_token: (user.type === 'office_user') ? access_token : undefined,
        username: undefined,
        password: undefined,
    };

    const result = await handleOAuthUsersAction(infos);
    console.log('ahahah result === ', result);
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

export const handleOAuthUsersAction = async (infos: UserInformations): Promise<{ error: boolean, message: string, result?: any }> => {
    return new Promise(async (resolve, reject) => {
        const user = await checkUserExists(infos);
        console.log('user === ', user);
        if (user == [] || user == undefined) {
            console.log('salut ahahahahhaha gros con');
        }
        if (user == [] || user == undefined) {
            await addUsers(infos, (err: any, result: any) => {
                if (err) {
                    console.debug('[handleOAuthUsersAction] | error[addUsers] = ', err);
                    resolve({ error: true, message: "username or email already exists" });
                } else {
                    console.debug('[handleOAuthUsersAction] | result[addUsers] = ', result);
                    resolve({ error: false, message: "user created", result: result });
                }
            });
        } else {
            console.debug('[handleOAuthUsersAction] | user = ', user);
            resolve({ error: false, message: "user already exists", result: user });
        }
    });
};

const checkUserExists = async (infos: UserInformations): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        await getUsers(infos, (err: any, result: any) => {
            if (err) {
                console.debug('[checkUserExists] | error[getUsers] = ', err);
                resolve ([]);
            } else {
                console.debug('result1', result);
                console.debug('result1[0]', result[0]);
                resolve((result![0]) ? result[0] : []);
            }
        });
    });
};