import express from 'express';
import axios, { AxiosResponse } from 'axios';
import { IntraEpitechUser } from '../../database/interfaces';

class IntraEpitech {
    async getProfile(req: express.Request, res: express.Response) {
        try {
            const { autologin } = req.body;
            let autoLogin: string = autologin;
            let url: string = "";

            if (autologin) {
                if (autoLogin.startsWith("https://intra.epitech.eu/")) {
                    autoLogin = autoLogin.substring(25);
                }
            }
            url = `https://intra.epitech.eu/${autoLogin}/user?format=json`;

            let response: AxiosResponse = await axios({
                method: 'get',
                url: url
            });
            const user: IntraEpitechUser = {
                login: response.data['login'],
                firstname: response.data['firstname'],
                lastname: response.data['lastname'],
                profilePicture: response.data['picture'],
                promo: response.data['promo'],
                location: response.data['groups'][0]['name'],
                semesterCode: response.data['semester_code'],
                credits: response.data['credits'],
                gpa: response.data['gpa'][0]['gpa'],
            };
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default new IntraEpitech();