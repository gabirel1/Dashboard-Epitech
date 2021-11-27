import express from "express";
import jwt from "jsonwebtoken";
import { updateUserInformations } from "./profileActions";

class ProfileUpdate {
    async patch(req: express.Request, res: express.Response) {
        let token: string = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ valid: false, message: "token not found" });
        }
        token = token.split(" ")[1];

        try {
            const decoded: string | jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    
            if (!decoded) {
                console.log("heeeeeeeeeeeeeeeeeeeeere");
                return res.status(401).json({ valid: false, message: "token invalid" });
            }
        } catch (error) {
            console.log("heeeeeeeeeeeeeeeeeeeeere2");
            return res.status(401).json({ valid: false, message: "token invalid" });
        }

        await updateUserInformations(req, res);
    }
}

module.exports = new ProfileUpdate();