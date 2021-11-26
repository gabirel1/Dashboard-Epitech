import { db } from "../../database/database";

export const checkToken = (token: string, callback: Function) => {
    const queryString: string = "SELECT * FROM users WHERE token = '" + token + "' LIMIT 1;";
    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            console.log("res == ", result);
            callback(null, result);
        }
    });
}