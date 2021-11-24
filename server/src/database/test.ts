import { Console } from 'console';
import express from 'express';
import { getUsers, addUsers } from './databaseActions';
import { UserInformations } from './interfaces';

class Test {
    async post(req: express.Request, res: express.Response) {
        const { mail, google_mail, facebook_mail, apple_mail, office_mail, username, password } = req.body;
        const infos: UserInformations = {
            mail,
            google_mail,
            facebook_mail,
            apple_mail,
            office_mail,
            username,
            password,
        };
        
        getUsers(infos, (err: any, result: any) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json(result);
            }
        });
    }

    async patch(req: express.Request, res: express.Response) {
        const { mail, google_mail, facebook_mail, apple_mail, office_mail, username, password } = req.body;
        const infos: UserInformations = {
            mail,
            google_mail,
            facebook_mail,
            apple_mail,
            office_mail,
            username,
            password,
        };

        let user = [];

        getUsers(infos, (err: any, result: any) => {
            if (err) {
                console.debug('error1', err);
                user = [];
            } else {
                console.debug('result1', result);
                (result !== []) ? user.push(result[0]) : user = [];
                console.debug('user == ', user);
                // user.pus (result === []) ? [] : result[0];
            }
        });
        console.log("user1 == ", user);
        if (user == []) {
            console.log("user2 == ", user);
            await addUsers(infos, (err: any, result: any) => {
                if (err) {
                    return res.status(404).json(err);
                } else {
                    return res.status(200).json(result);
                }
            });
        }
        console.log("user3 == ", user);
        return res.status(200).json(user);
    }
}

module.exports = new Test();