import express from 'express';
import axios, { AxiosResponse } from 'axios';

class Temperature {
    async getTemperature(req: express.Request, res: express.Response) {
        try {
            const { city } = req.body;
            const apikey: string = process.env.WEATHER_API_KEY;
            const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=${apikey}`;

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

    async getWeather(req: express.Request, res: express.Response) {
        try {
            const { city } = req.body;
            const apikey: string = process.env.WEATHER_API_KEY;
            const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=${apikey}`;

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