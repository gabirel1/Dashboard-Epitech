import express from 'express';
import axios, { AxiosResponse } from 'axios';

class Temperature {

    /**
     * retrieves the temperature of a city
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async getTemperature(req: express.Request, res: express.Response) {
        try {
            const { city, api_key } = req.body;
            const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=${api_key}`;

            let response: AxiosResponse = await axios({
                method: 'get',
                url: url
            });
            return res.status(200).json(response.data['main']);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    /**
     * retrieves the weather of a city
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async getWeather(req: express.Request, res: express.Response) {
        try {
            const { city, api_key } = req.body;
            const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=${api_key}`;

            let response: AxiosResponse = await axios({
                method: 'get',
                url: url
            });
            return res.status(200).json(response.data['weather']);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
};

export default new Temperature();