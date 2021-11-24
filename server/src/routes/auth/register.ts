import express from "express"
import { registerPlainUser } from "./registerActions";

class Register {
    async post(req: express.Request, res: express.Response) {
        const type = req.params.type;
        console.log(req.params);

        switch (type) {
            case "plain_user":
                return registerPlainUser(req, res);
            case "":
                return res.send(405).json({ error: true, message: "type not found" });
        }
    }
}

module.exports = new Register();