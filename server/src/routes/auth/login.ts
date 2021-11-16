import express from "express";
import { addUser, getUser } from "../../database/actions";
import { loginGoogle } from "./loginActions";

class Login {
    async post(req: express.Request, res: express.Response) {
        const type: string = req.params.type;

        switch (type) {
            case "google_user":
                return loginGoogle(req, res);
            case "":
                return res.send(405).json({ error: true, message: "type not found" });
        }
    }
}

module.exports = new Login();