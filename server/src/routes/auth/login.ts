import express from "express";
import { getUsers, updateInfos } from "../../database/databaseActions";
import { UserInformations } from "../../database/interfaces";
import jwt from 'jsonwebtoken';
import moment from "moment";

class Login {
    /**
     * login a basic user
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async post(req: express.Request, res: express.Response) {
        const { mail, password } = req.body;

        if (!mail || !password) {
            return res.status(400).json({
                valid: false,
                message: "mail and password are required"
            });
        }

        const user: UserInformations = {
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
            password: password
        };

        const expiresIn: number = Number(process.env.EXPIRE_TIME) || 60 * 60;
        const payload = {
            mail: mail
        };
        const newToken: string = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: expiresIn }
        );

        await getUsers(user, async (err: any, result: any) => {
            if (err) {
                return res.status(500).json({
                    valid: false,
                    message: err
                });
            } else {
                let _result = result;
                if (result.length === 0) {
                    return res.status(400).json({
                        valid: false,
                        message: "mail or password is incorrect"
                    });
                } else {
                    _result['token'] = newToken;
                    _result['token_created_at'] = moment().format('YYYY-MM-DD HH:mm:ss');
                    await updateInfos(['token', 'token_created_at'], [newToken, moment().format('YYYY-MM-DD HH:mm:ss')], 'mail', mail, (err: any, result: any) => {
                        if (err) {
                            return res.status(500).json({
                                valid: false,
                                message: err
                            });
                        } else {
                            return res.status(200).json({ error: false, message: "user logged in", token: newToken, expiresIn: expiresIn, result: _result });
                        }
                    });
                }
            }
        });
    }
}

module.exports = new Login();
