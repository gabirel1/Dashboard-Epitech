import { db } from "../../database/database";

/**
 * check if the given token correspond to a user's token
 * @param {string} token 
 * @param callback 
 */
export const checkToken = (token: string, callback: Function) => {
    const queryString: string = "SELECT * FROM users WHERE token = '" + token + "' LIMIT 1;";
    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}