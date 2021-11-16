import express from 'express';
import { addGoogleUser, addUser } from '../../database/actions';

export const registerPlainUser = (req: express.Request, res: express.Response) => {
    const { mail, username, password } = req.body;
        console.log(req.body);
        
        addUser(mail, username, password, (err: any, result: any) => {
            if (err) {
                console.log(err);
                return res.status(409).json({ error: true, message: "username or email already exists" });
            } else {
                return res.status(200).json({ error: false, message: "user created", result: result });
            }
    });
}

export const registerGoogleUser = (req: express.Request, res: express.Response) => {
    const { mail, username } = req.body;

    addGoogleUser(username, mail, (err: any, result: any) => {
        if (err) {
            console.log(err);
            return res.status(409).json({ error: true, message: "You might already have registered with this account" });
        } else {
            return res.status(200).json({ error: false, message: "user created", result: result });
        }
    });
}