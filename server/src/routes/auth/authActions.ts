import express from 'express';
import { UserInformations } from '../../database/interfaces';
import { addUsers, getUsers, updateInfos, updateUserAuthToken } from '../../database/databaseActions';
import jwt from 'jsonwebtoken';
import axios, { AxiosResponse } from 'axios';

/**
 * handle the login or the registration of a OAuth's user (a user logged on signed in with a google/facebook/office account)
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns 
 */
export const handleOAuthUsers = async (req: express.Request, res: express.Response) => {
    try {
        const type: string = req.params.type;
        const { access_token } = req.body;
        let user: { type: string, userJson: any } = { type: '', userJson: {} };
        let response: AxiosResponse;

        switch (type) {
            case 'google_user':
                console.log('bearer token == ', access_token);
                response = await axios({
                    method: 'GET',
                    url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });
                console.debug("response == ", response.data);
                let googleUser = response.data;
                user = { type: 'google_user', userJson: googleUser };
                break;
            case 'facebook_user':
                response = await axios({
                    method: 'GET',
                    url: 'https://graph.facebook.com/me/?fields=id,name,email',
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });
                let facebookUser = response.data;
                user = { type: 'facebook_user', userJson: facebookUser };
                break;
            case 'office_user':
                response = await axios({
                    method: 'GET',
                    url: 'https://graph.microsoft.com/v1.0/me',
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });
                console.log("response == ", response.data);
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
            office_mail: (user.type === 'office_user') ? user.userJson.mail : undefined,
            office_token: (user.type === 'office_user') ? access_token : undefined,
            username: undefined,
            password: undefined,
        };

        const result = await handleOAuthUsersAction(infos);
        if (result.error === true) {
            return res.status(500).json({
                error: result.error,
                message: result.message,
            });
        }
        if (result.message === "user created") {
            return res.status(200).json({ error: false, message: "user created", result: result.result });
        }
        if (result.message === "user already exists") {
            const expiresIn: number = Number(process.env.EXPIRE_TIME) || 60 * 60;
            const payload = {
                mail: (user.type === 'google_user') ? user.userJson.email : (user.type === 'facebook_user') ? user.userJson.email : (user.type === 'apple_user') ? user.userJson.email : (user.type === 'office_user') ? user.userJson.email : "none",
            };
            const token: string = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: expiresIn }
            );
            await updateUserAuthToken(infos, token, (err: any, result: any) => {
                if (err) {
                    console.debug('[handleOAuthUsersAction] | error[updateUserAuthToken] = ', err);
                } else {
                    console.debug('[handleOAuthUsersAction] | result[updateUserAuthToken] = ', result);
                }
            });
            return res.status(200).json({ error: false, message: "user logged in", expiresIn: expiresIn, token: token, result: result.result });
        }
    } catch (err) {
        console.debug('[handleOAuthUsersAction] | error = ', err);
        return res.status(500).json({ error: true, message: "server error" });
    }
}

/**
 * save or get user from / in database
 * @param {UserInformations} infos the user 
 * @returns 
 */
export const handleOAuthUsersAction = async (infos: UserInformations): Promise<{ error: boolean, message: string, result?: any }> => {
    return new Promise(async (resolve, reject) => {
        await getUsers(infos, async (err: any, result: any) => {
            if (err) {
                console.debug('[handleOAuthUsersAction] | error[getUsers] = ', err);
                await addUsers(infos, (err: any, result: any) => {
                    if (err) {
                        console.debug('[handleOAuthUsersAction] | error[addUsers] = ', err);
                        return resolve({ error: true, message: "internal error" });
                    } else {
                        console.debug('[handleOAuthUsersAction] | result[addUsers] = ', result);
                        return resolve({ error: false, message: "user created", result: result });
                    }
                });
            } else {
                console.debug('[handleOAuthUsersAction] | result[getUsers] = ', result);
                if (result.length === 0) {
                    await addUsers(infos, (err: any, result: any) => {
                        if (err) {
                            console.debug('[handleOAuthUsersAction] | error[addUsers] = ', err);
                            return resolve({ error: true, message: "internal error" });
                        } else {
                            console.debug('[handleOAuthUsersAction] | result[addUsers] = ', result);
                            return resolve({ error: false, message: "user created", result: result });
                        }
                    });
                } else {
                    return resolve({ error: false, message: "user already exists", result: result });
                }
            }
        });
    });
};