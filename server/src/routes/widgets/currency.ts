import express from 'express';
import axios, { AxiosResponse } from 'axios';

class Currency {

    /**
     * retrieve the current exchange rate for a given currency
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async getExchangeRate(req: express.Request, res: express.Response) {
        try {
            const { from, to, api_key } = req.body;
            console.log(from, to);
            const url: string = `https://freecurrencyapi.net/api/v2/latest?base_currency=${from}&apikey=${api_key}`;

            let response: AxiosResponse = await axios({
                method: 'get',
                url: url
            });
            let currency: number = response.data.data[to];
            console.log('currency == ', currency);
            return res.status(200).json({
                "base_currency": from,
                "target_currency": to,
                "rate": currency
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default new Currency();