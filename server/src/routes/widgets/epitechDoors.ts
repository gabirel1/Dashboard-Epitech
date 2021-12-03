import express from 'express';
import axios, { AxiosResponse } from 'axios';

class EpitechDoors {
    async openDoor(req: express.Request, res: express.Response) {
        try {
            const { intra_autologin, door_name } = req.body;
            let autoLogin: string = intra_autologin;
            let url: string = "";

            if (autoLogin.startsWith("https://intra.epitech.eu/") == false) {
                autoLogin = `https://intra.epitech.eu/${intra_autologin}`;
            }
            console.log('autologin == ', autoLogin);
            url = `https://epi-logue.eu/api/doors_open?login=${autoLogin}&door_name=${door_name}`;
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
};

export default new EpitechDoors();