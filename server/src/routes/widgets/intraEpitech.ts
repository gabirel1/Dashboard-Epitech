import express from 'express';
import axios, { AxiosResponse } from 'axios';
import { IntraEpitechUser } from '../../database/interfaces';

class IntraEpitech {

    /**
     * retrieves the user's profile informations (gpa, credits, profile picture ...)
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
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

    /**
     * retrieves the user's partners (the people with whom the user did a project with)
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async getPartners(req: express.Request, res: express.Response) {
        try {
            const { autologin } = req.body;
            let autoLogin: string = autologin;
            let url: string = "";
    
            if (autologin) {
                if (autoLogin.startsWith("https://intra.epitech.eu/")) {
                    autoLogin = autoLogin.substring(25);
                }
            }
    
            let response: AxiosResponse = await axios({
                method: 'get',
                url: `https://intra.epitech.eu/${autoLogin}/user?format=json`
            });
            const login: string = response.data['login'];
            url = `https://intra.epitech.eu/${autoLogin}/user/${login}/binome/?format=json`;
            let response2: AxiosResponse = await axios({
                method: 'get',
                url: url
            });
            return res.status(200).json(response2.data['binomes']);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }


    /**
     * retrieves user's notifications
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async getNotifications(req: express.Request, res: express.Response) {
        try {
            const { autologin, max_results } = req.body;            
            let autoLogin: string = autologin;
            let url: string = "";

            if (autologin) {
                if (autoLogin.startsWith("https://intra.epitech.eu/")) {
                    autoLogin = autoLogin.substring(25);
                }
            }
            let response: AxiosResponse = await axios({
                method: 'get',
                url: `https://intra.epitech.eu/${autoLogin}/user?format=json`
            });
            const login: string = response.data['login'];

            url = `https://intra.epitech.eu/${autoLogin}/user/${login}/notification/message?format=json`;
            let response2: AxiosResponse = await axios({
                method: 'get',
                url: url,
            });
            let result = [];

            for (let i: number = 0; i < max_results && i < response2.data.length; i++) {
                result.push(response2.data[i]);
            }
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    /**
     * retrieves the user's grades
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async getGrades(req: express.Request, res: express.Response) {
        try {
            const { autologin, semester_code } = req.body;
            let autoLogin: string = autologin;
            let url: string = "";

            if (autoLogin.startsWith("https://intra.epitech.eu/")) {
                autoLogin = autoLogin.substring(25);
            }
            url = `https://intra.epitech.eu/${autoLogin}/user?format=json`;
            let response: AxiosResponse = await axios({
                method: 'get',
                url: url
            });
            const login: string = response.data['login'];
            url = `https://intra.epitech.eu/${autoLogin}/user/${login}/notes?format=json`;
            let response2: AxiosResponse = await axios({
                method: 'get',
                url: url,
            });
            let result = [];

            for (let i: number = 0; i < response2.data['modules'].length; i++) {
                if (response2.data['modules'][i]['title'].startsWith(semester_code)) {
                    result.push(response2.data['modules'][i]);
                }
            }
            // console.log('modules: ', response2.data['modules']);
            // return res.status(200).json(response2.data['modules']);            
            return res.status(200).json(result);            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default new IntraEpitech();