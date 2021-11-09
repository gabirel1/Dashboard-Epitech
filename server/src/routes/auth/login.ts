import express from "express";

class LOGIN {
  async post(req: express.Request, res: express.Response) {
    res.status(200);
    return res.send("test");
  }
  async get(req: express.Request, res: express.Response) {
    res.status(200);
    return res.send("testGET");
  }
}

module.exports = new LOGIN();