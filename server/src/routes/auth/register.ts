import express from "express"
import { UserInformations } from "../../database/interfaces";
import { registerBasicUser } from "./registerActions";

class Register {
    async post(req: express.Request, res: express.Response) {
        const { mail, password } = req.body;

        const infos: UserInformations = {
            mail: mail,
            google_mail: undefined,
            google_token: undefined,
            facebook_mail: undefined,
            facebook_token: undefined,
            apple_mail: undefined,
            apple_token: undefined,
            office_mail: undefined,
            office_token: undefined,
            username: undefined,
            password: password,
        };
        let result = await registerBasicUser(infos);

        if (result.error === true) {
            return res.status(500).json({
                error: true,
                message: result.message,
            });
        }
        if (result.error === false && result.message === "user already exists") {
            return res.status(403).json({ error: true, message: result.message });
        }
        return res.status(200).json({ error: false, message: result.message, result: result.result });
    }
}

module.exports = new Register();