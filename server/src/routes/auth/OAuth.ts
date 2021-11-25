import express from 'express';
import { handleOAuthUsers } from './authActions';

class Authentication {
    async post(req: express.Request, res: express.Response) {
        return handleOAuthUsers(req, res);
    }
}

module.exports = new Authentication();