import express from 'express';
import { getUsers, addUsers } from '../../database/databaseActions';
import { UserInformations } from '../../database/interfaces';

/**
 * save a user in the database if it doesn't already exists
 * @param {UserInformations} infos a user
 * @returns 
 */
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