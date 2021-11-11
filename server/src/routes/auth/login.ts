import express from "express";

class Login {
  async post(req: express.Request, res: express.Response) {
    let { email, password } = req.body;

    res.status(200);
    return res.send("test");
  }
  async get(req: express.Request, res: express.Response) {
    res.status(200);
    return res.send("testGET");
  }
}

module.exports = new Login();