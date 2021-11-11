import express from 'express';
import jwt from 'jsonwebtoken';
import { addUser, getUser } from '../../database/actions';

import { db } from '../../database/database';

class Token {
    async get(req: express.Request, res: express.Response) {
        addUser({id: 0, mail: "test@mail.com", password: "testpass", token: "thisismytoken"}, (test: any, test2: any) => {})
        return res.status(200).send("testllll");
    }
    async post(req: express.Request, res: express.Response) {
        getUser({id: 0, mail: "test@mail.com", password: "testpass", token: "thisismytoken"}, (test: any, test2: any) => {});
        return res.status(200).send("testllll");
    }
}

module.exports = new Token();