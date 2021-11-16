import express from "express"
import { addUser } from "../../database/actions"

class Register {
    async post(req: express.Request, res: express.Response) {
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
}

module.exports = new Register();