import { info } from 'console';
import { db } from './database';
import { UserInformations } from './interfaces';

export const getUsers = async (infos: UserInformations, callback: Function) => {
    let wasFound: boolean = false;
    let query: string = "SELECT * FROM users WHERE ";

    try {
        if (infos.mail !== undefined) {
            query += "mail = '" + infos.mail + "' AND username = '"
                    + infos.username + "' AND password = '" + infos.password + "';";
            wasFound = true;
        }
        if (infos.google_mail !== undefined && wasFound === false) {
            query += "google_mail = '" + infos.google_mail + "';";
            wasFound = true;
        }
        if (infos.facebook_mail !== undefined && wasFound === false) {
            query += "facebook_mail = '" + infos.facebook_mail + "';";
            wasFound = true;
        }
        if (infos.apple_mail !== undefined && wasFound === false) {
            query += "apple_mail = '" + infos.apple_mail + "';";
            wasFound = true;
        }
        if (infos.office_mail !== undefined && wasFound === false) {
            query += "office_mail = '" + infos.office_mail + "';";
            wasFound = true;
        }

        console.debug("query == ", query);

        db.query(query, (err: any, result: any) => {
            if (err) {
                console.debug(err);
                callback(err);
            } else {
                console.debug(result);
                callback(null, result);
            }
        });
    } catch (err) {
        callback(err);
    }
};

export const addUsers = async (infos: UserInformations, callback: Function) => {
    let query: string = "INSERT into users (";
    let wasFound: boolean = false;

    try {
        if (infos.mail !== undefined) {
            query += "mail, username, password) VALUES ('"
                    + infos.mail + "', '" + infos.username
                    + "', '" + infos.password + "');";
            wasFound = true;
        }
        if (infos.google_mail !== undefined && wasFound === false) {
            query += "google_mail, username) VALUES ('"
                    + infos.google_mail + "', '" + infos.username + "');";
            wasFound = true;
        }
        if (infos.facebook_mail !== undefined && wasFound === false) {
            query += "facebook_mail, username) VALUES ('"
                    + infos.facebook_mail + "', '" + infos.username + "');";
            wasFound = true;
        }
        if (infos.apple_mail !== undefined && wasFound === false) {
            query += "apple_mail, username) VALUES ('"
                    + infos.apple_mail + "', '" + infos.username + "');";
            wasFound = true;
        }
        if (infos.office_mail !== undefined && wasFound === false) {
            query += "office_mail, username) VALUES ('"
                    + infos.office_mail + "', '" + infos.username + "');";
            wasFound = true;
        }

        console.debug("query == ", query);
        db.query(query, (err: any, result: any) => {
            if (err) {
                console.debug(err);
                callback(err);
            } else {
                console.debug(result);
                callback(null, result);
            }
        });
    } catch (err) {
        callback(err);
    }
}