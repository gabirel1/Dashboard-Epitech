import express from 'express';
import { updateInfos } from '../../database/databaseActions';
import axios, { AxiosResponse } from 'axios';

/**
 * update a user informations
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns 
 */
export const updateUserInformations = async (req: express.Request, res: express.Response) => {
    try {
        const type: string = req.params.type;
        const { access_token } = req.body;
        let token: string = req.headers.authorization;
        token = token.split(" ")[1];
        let response: AxiosResponse;
        let user: { type: string, userJson: any } = { type: '', userJson: {} };

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
                let officeUser = response.data;
                user = { type: 'office_user', userJson: officeUser };
                break;
            case 'plain_user':
                let plainUser = {
                    mail: req.body.mail,
                    password: req.body.password,
                };
                user = { type: 'plain_user', userJson: plainUser };
                break;
            default:
                return res.status(400).json({ message: 'Bad request' });
        };

        if (user.type === 'google_user') {
            await updateInfos(['google_mail', 'google_token'], [user.userJson.email, access_token], "token", token, (err: Error, result: any) => {
                if (err) {
                    console.log("heeeeerererere2 ", err);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                return res.status(200).json({ message: 'User informations updated', google_token: access_token });
            });
        }
        if (user.type === 'office_user') {
            await updateInfos(['office_mail', 'office_token'], [user.userJson.email, access_token], "token", token, (err: Error, result: any) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal server error' });
                }
                return res.status(200).json({ message: 'User informations updated', office_token: access_token });
            });
        }
        if (user.type === 'facebook_user') {
            await updateInfos(['facebook_mail', 'facebook_token'], [user.userJson.email, access_token], "token", token, (err: Error, result: any) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal server error' });
                }
                return res.status(200).json({ message: 'User informations updated', facebook_token: access_token });
            });
        }
        if (user.type === 'plain_user') {
            await updateInfos(['mail', 'password'], [user.userJson.mail, user.userJson.password], "token", token, (err: Error, result: any) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal server error' });
                }
                return res.status(200).json({ message: 'User informations updated' });
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'server error' });
    }
}