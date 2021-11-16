import express from 'express';
import { getUserGoogle, getUser } from '../../database/actions';

export const loginUser = (req: express.Request, res: express.Response) => {
    const { mail, password } = req.body;

    getUser(mail, password, (err, result) => {
        if (err) {
            console.debug(err);
            return res.status(401).json({ error: true, message: "invalid credentials" });
        } else {
            return res.status(200).json({ error: false, message: "user logged in", expiresIn: result.expiresIn, token: result.token, result: result.result });
        }
    });
};

export const loginGoogle = (req: express.Request, res: express.Response) => {
    const { mail, username } = req.body;

    getUserGoogle(mail, username, (err, result) => {
        if (err) {
            console.debug(err);
            return res.status(401).json({ error: true, message: "invalid credentials" });
        } else {
            return res.status(200).json({ error: false, message: "user logged in", expiresIn: result.expiresIn, token: result.token, result: result.result });
        }
    });
};