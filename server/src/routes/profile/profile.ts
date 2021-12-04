import express from 'express';
import jwt from 'jsonwebtoken';
import { getRow, getUsers } from '../../database/databaseActions';

class Profile {

    /**
     * retrieves the user informations
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async get(req: express.Request, res: express.Response) {
        let token: string = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ valid: false, message: "token not found" });
        }
        token = token.split(" ")[1];

        try {
            const decoded: string | jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    
            if (!decoded) {
                return res.status(401).json({ valid: false, message: "token invalid" });
            }
        } catch (error) {
            return res.status(401).json({ valid: false, message: "token invalid" });
        }

        await getRow('token', token, (err: any, result: any) => {
            if (err) {
                console.debug(err);
                return res.status(500).json({ error: false, message: "internal server error" });
            } else {
                if (result.length === 0) {
                    return res.status(404).json({ error: false, message: "user not found" });
                } else {
                    console.log("result == ", result);
                    console.log("result[0] == ", result[0]);
                    let rslt = result[0];
                    let user = {
                        mail: rslt['mail'],
                        google_mail: rslt['google_mail'],
                        facebook_mail: rslt['facebook_mail'],
                        outlook_mail: rslt['outlook_mail'],
                        apple_mail: rslt['apple_mail'],
                        office_mail: rslt['office_mail'],
                    };

                    return res.status(200).json({ error: true, message: "user found", result: user });
                }
            }
        });
    }
}

module.exports = new Profile();