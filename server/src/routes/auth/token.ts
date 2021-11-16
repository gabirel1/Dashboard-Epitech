import express from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { addUser, checkToken, generateNewToken, getUser } from '../../database/actions';

import { db } from '../../database/database';

class Token {
    async get(req: express.Request, res: express.Response) {
        let token: string = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ valid: false, message: "token not found" });
        }
        token = token.split(" ")[1];
        checkToken(token, (err: any, result: any) => {
            if (err || result === [] || result === null || result === undefined || result.length === 0) {
                console.debug(result);
                return res.status(401).json({ valid: false, message: "token invalid or not found" });
            } else {
                let createdAt: moment.Moment = moment(result[0].token_created_at);
                let now: moment.Moment = moment();
                let diff: number = now.diff(createdAt, 'seconds');
                if (diff < Number(process.env.EXPIRE_TIME) - 10 || diff < 3590) {
                    return res.status(200).json({ valid: true, message: "token valid" });
                }
                return res.status(401).json({ valid: false, message: "token expired" });
            }
        });
        // return res.status(200).send("testllll");
    }

    async post(req: express.Request, res: express.Response) {
        const { username } = req.body;
        let token: string = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ valid: false, message: "token not found" });
        }
        token = token.split(" ")[1];

        generateNewToken(token, username, (err: any, result: any) => {
            if (err) {
                console.debug(err);
                return res.status(500).json({ valid: false, message: "internal server error" });
            } else {
                if (result.result.affectedRows === 0) {
                    return res.status(401).json({ valid: false, message: "token invalid or not found" });
                } else {
                    return res.status(200).json({ valid: true, message: "token valid", expiresIn: result.expiresIn, token: result.token, result: result.result });
                }
            }
        });
    }
}

module.exports = new Token();