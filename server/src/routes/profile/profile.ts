import express from "express";
import { addOauthLogins } from "../../database/actions";
import jwt from "jsonwebtoken";
import { updateUserInformations } from "./profileActions";

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

        await updateUserInformations(req, res);
    }
}

module.exports = new Profile();