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

    async getNotifications(req: express.Request, res: express.Response) {
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

            url = `https://intra.epitech.eu/${autoLogin}/user/${login}/notification/message?format=json`;
            let response2: AxiosResponse = await axios({
                method: 'get',
                url: url,
            });
            return res.status(200).json(response2.data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    async getGrades(req: express.Request, res: express.Response) {
        try {
            const { autologin } = req.body;
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
            return res.status(200).json(response2.data['modules']);            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    async openDoor(req: express.Request, res: express.Response) {
        try {
            const { autologin, door_name } = req.body;
            let autoLogin: string = autologin;
            let url: string = "";

            if (autoLogin.startsWith("https://intra.epitech.eu/") == false) {
                autoLogin = `https://intra.epitech.eu/${autologin}`;
            }
            console.log('autologin == ', autoLogin);
            url = `https://epi-logue.eu/api/doors_open?login=${autologin}&door_name=${door_name}`;
            let response: AxiosResponse = await axios({
                method: 'get',
                url: url,
            });
            return res.status(response.status).json(response.data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default new IntraEpitech();