import express from "express";
import jwt from "jsonwebtoken";
import { updateUserInformations } from "./profileActions";

class ProfileUpdate {

    /**
     * update a user informations if the given token is valid
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async patch(req: express.Request, res: express.Response) {
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

        await updateUserInformations(req, res);
    }
}

module.exports = new ProfileUpdate();