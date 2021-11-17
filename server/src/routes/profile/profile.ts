import express from "express";
import { addOauthLogins } from "../../database/actions";
import jwt from "jsonwebtoken";

class Profile {
    async patch(req: express.Request, res: express.Response) {
        let token: string = req.headers.authorization;
        const { username, mail, type } = req.body;
        if (!token) {
            return res.status(401).json({ valid: false, message: "token not found" });
        }
        token = token.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ valid: false, message: "token invalid" });
            }
        });

        addOauthLogins(token, mail, username, type, (err, result) => {
            if (err) {
                return res.status(500).json({ valid: false, message: err });
            }
            return res.status(200).json({ valid: true, message: "success" });
        });
    }

}

module.exports = new Profile();