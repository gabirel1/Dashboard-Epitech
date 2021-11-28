import express from "express";
import axios, { AxiosResponse } from "axios";

class Nasa {
    async getNasaDayImage(req: express.Request, res: express.Response) {
        try {
            const { date } = req.body;
            const apiKey: string = process.env.NASA_API_KEY;
            const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

            let response: AxiosResponse = await axios({
                method: "get",
                url: url
            });
            return res.status(200).json(response.data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default new Nasa();