import express from 'express';
import { getUsers, addUsers } from '../../database/databaseActions';
// import { addGoogleUser, addUser } from '../../database/actions';
import { UserInformations } from '../../database/interfaces';

// export const registerPlainUser = (req: express.Request, res: express.Response) => {
//     const { mail, username, password } = req.body;
//         console.log(req.body);
        
//         addUser(mail, username, password, (err: any, result: any) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(409).json({ error: true, message: "username or email already exists" });
//             } else {
//                 return res.status(200).json({ error: false, message: "user created", result: result });
//             }
//     });
// }

// export const registerGoogleUser = (req: express.Request, res: express.Response) => {
//     const { mail, username } = req.body;

//     addGoogleUser(username, mail, (err: any, result: any) => {
//         if (err) {
//             console.log(err);
//             return res.status(409).json({ error: true, message: "You might already have registered with this account" });
//         } else {
//             return res.status(200).json({ error: false, message: "user created", result: result });
//         }
//     });
// }

export const registerBasicUser = async (infos: UserInformations): Promise<{ error: boolean, message: string, result?: any }> => {
    return new Promise(async (resolve, reject) => {
        await getUsers(infos, async (err: any, result: any) => {
            if (err) {
                console.debug('[handleOAuthUsersAction] | error[getUsers] = ', err);
                await addUsers(infos, (err: any, result: any) => {
                    if (err) {
                        console.debug('[handleOAuthUsersAction] | error[addUsers] = ', err);
                        return resolve({ error: true, message: "internal error" });
                    } else {
                        console.debug('[handleOAuthUsersAction] | result[addUsers] = ', result);
                        return resolve({ error: false, message: "user created", result: result });
                    }
                });
            } else {
                console.debug('[handleOAuthUsersAction] | result[getUsers] = ', result);
                if (result.length === 0) {
                    await addUsers(infos, (err: any, result: any) => {
                        if (err) {
                            console.debug('[handleOAuthUsersAction] | error[addUsers] = ', err);
                            return resolve({ error: true, message: "internal error" });
                        } else {
                            console.debug('[handleOAuthUsersAction] | result[addUsers] = ', result);
                            return resolve({ error: false, message: "user created", result: result });
                        }
                    });
                } else {
                    return resolve({ error: false, message: "user already exists", result: result });
                }
            }
        });
    });
};