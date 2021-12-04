import express from "express";
import axios, { AxiosResponse } from "axios";

class Nasa {
    /**
     * retrieves the image of the day from the nasa API
     * @param req express request
     * @param res express response
     * @returns
     */
    async getNasaDayImage(req: express.Request, res: express.Response) {
        try {
            const { date, api_key } = req.body;
            const url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`;

            let response: AxiosResponse = await axios({
                method: "get",
                url: url
            });
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    /**
     * retrieves the curiosity rover image of the day from the nasa API
     * @param req express request
     * @param res express response
     * @returns 
     */
    async getNasaRoverImage(req: express.Request, res: express.Response) {
        try {
            const { date, camera, api_key } = req.body;
            const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${camera}&api_key=${api_key}`;

            let response: AxiosResponse = await axios({
                method: "get",
                url: url
            });
            let data = response.data.photos;
            let photo: any = data[0] ? data[0] : {};

            return res.status(200).json(photo);
        } catch (error) {
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default new Nasa();