import express from "express";
import { addUser, getUser } from "../../database/actions";

class Login {
  // async post(req: express.Request, res: express.Response) {
  //   const { mail, username, password } = req.body;
  //   console.log(req.body);

  //   addUser(mail, username, password, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(409).json({ error: true, message: "username or email already exists" });
  //     } else {
  //       return res.status(200).json({ error: false, message: "user created", result: result });
  //     }
  //   });
  // }
    async post(req: express.Request, res: express.Response) {
        const { mail, password } = req.body;

        getUser(mail, password, (err, result) => {
            if (err) {
                console.debug(err);
                return res.status(401).json({ error: true, message: "invalid credentials" });
            } else {
                return res.status(200).json({ error: false, message: "user logged in", expiresIn: result.expiresIn, token: result.token, result: result.result });
            }
        });
    }
}

module.exports = new Login();