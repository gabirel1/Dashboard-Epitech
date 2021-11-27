import express from 'express';
import jwt from 'jsonwebtoken';
import { getRow, getUsers } from '../../database/databaseActions';

class Profile {
    async get(req: express.Request, res: express.Response) {
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

        await getRow('token', token, (err: any, result: any) => {
            if (err) {
                console.debug(err);
                return res.status(500).json({ error: false, message: "internal server error" });
            } else {
                if (result.length === 0) {
                    return res.status(404).json({ error: false, message: "user not found" });
                } else {
                    return res.status(200).json({ error: true, message: "user found", result: result });
                }
            }
        });
    }
}