import express from 'express';
import axios, { AxiosResponse } from 'axios';

class Currency {
    async getExchangeRate(req: express.Request, res: express.Response) {
        try {
            const { from, to } = req.body;
            console.log(from, to);
            const apikey = process.env.FREE_CURRENCY_API_KEY;
            const url: string = `https://freecurrencyapi.net/api/v2/latest?base_currency=${from}&apikey=${apikey}`;

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