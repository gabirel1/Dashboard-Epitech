import express from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { updateInfos } from '../../database/databaseActions';
import Utils from '../../utils/utils';
import { checkToken } from './tokenAction';

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
    }

    async post(req: express.Request, res: express.Response) {
        let token: string = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ valid: false, message: "token not found" });
        }
        console.debug("token = ", token);
        token = token.split(" ")[1];
        console.debug("token2 = ", token);

        const expiresIn: number = Number(process.env.EXPIRE_TIME) || 60 * 60;
        const payload = {
            randomString: Utils.getRandomString(8),
        };
        const newToken: string = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: expiresIn }
        );
        await updateInfos(['token', 'token_created_at'], [newToken, moment().format('YYYY-MM-DD HH:mm:ss')], 'token', token, (err: any, result: any) => {
            if (err) {
                console.debug(err);
                return res.status(500).json({ valid: false, message: "internal server error" });
            } else {
                if (result.affectedRows === 0) {
                    return res.status(401).json({ valid: false, message: "token invalid or not found" });
                } else {
                    return res.status(200).json({ valid: true, message: "token valid", expiresIn: expiresIn, token: newToken, result: result.result });
                }
            }
        });
    }
}

module.exports = new Token();