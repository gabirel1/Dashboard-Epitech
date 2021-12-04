import express from 'express';
import { handleOAuthUsers } from './authActions';

class Authentication {
    
    /**
     * login / register a OAuth user
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async post(req: express.Request, res: express.Response) {
        return handleOAuthUsers(req, res);
    }
}

module.exports = new Authentication();