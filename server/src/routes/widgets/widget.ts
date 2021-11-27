import express from 'express';
import jwt from 'jsonwebtoken';
import Currency from './currency';

class Widget {
    async post(req: express.Request, res: express.Response) {
        const type: string = req.params.type;
        let token: string = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ valid: false, message: "token not found" });
        }
        token = token.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ valid: false, message: "token invalid" });
            }
        });

        switch (type) {
            case 'currency_converter':
                return await Currency.getExchangeRate(req, res);
            default:
                return res.status(404).json({ error: true, message: "widget not found" });
        }
    }
}

module.exports = new Widget();