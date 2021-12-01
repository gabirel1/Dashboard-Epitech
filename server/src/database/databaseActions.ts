import { info } from 'console';
import moment from 'moment';
import { db } from './database';
import { UserInformations } from './interfaces';

export const getUsers = async (infos: UserInformations, callback: Function) => {
    let wasFound: boolean = false;
    let query: string = "SELECT * FROM users WHERE ";

    try {
        if (infos.mail !== undefined) {
            query += "mail = '" + infos.mail + "' AND password = '" + infos.password + "';";
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
                console.debug("[getUser] err ", err);
                callback(err);
            } else {
                console.debug("[getUser] success ", result);
                callback(null, result);
            }
        });

    } catch (err) {
        callback(err);
    }
};

export const getUserByToken = async (token: string, callback: Function) => {
    let query: string = "SELECT * FROM users WHERE token = '" + token + "';";
    try {
        db.query(query, (err: any, result: any) => {
            if (err) {
                console.debug("[getUserByToken] err ", err);
                callback(err);
            } else {
                console.debug("[getUserByToken] success ", result);
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
            query += "mail, password) VALUES ('"
                + infos.mail + "', '" + infos.password + "');";
            wasFound = true;
        }
        if (infos.google_mail !== undefined && wasFound === false) {
            query += "google_mail, google_token) VALUES ('"
                + infos.google_mail + "', '" + infos.google_token + "');";
            wasFound = true;
        }
        if (infos.facebook_mail !== undefined && wasFound === false) {
            query += "facebook_mail, facebook_token) VALUES ('"
                + infos.facebook_mail + "', '" + infos.facebook_token + "');";
            wasFound = true;
        }
        if (infos.apple_mail !== undefined && wasFound === false) {
            query += "apple_mail, apple_token) VALUES ('"
                + infos.apple_mail + "', '" + infos.apple_token + "');";
            wasFound = true;
        }
        if (infos.office_mail !== undefined && wasFound === false) {
            query += "office_mail, office_token) VALUES ('"
                + infos.office_mail + "', '" + infos.office_token + "');";
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

export const updateUserAuthToken = async (infos: UserInformations, jwtToken: string, callback: Function) => {
    let query: string = "UPDATE users SET ";
    let wasFound: boolean = false;

    try {
        if (infos.mail !== undefined) {
            query += "token = '" + jwtToken + "', token_created_at = '"
                + moment().format('YYYY-MM-DD HH:mm:ss') + "' WHERE mail = '" + infos.mail + "';";
            wasFound = true;
        }
        if (infos.google_mail !== undefined && wasFound === false) {
            query += "token = '" + jwtToken + "', token_created_at = '"
                + moment().format('YYYY-MM-DD HH:mm:ss') + "' WHERE google_mail = '" + infos.google_mail + "';";
            wasFound = true;
        }
        if (infos.facebook_mail !== undefined && wasFound === false) {
            query += "token = '" + jwtToken + "', token_created_at = '"
                + moment().format('YYYY-MM-DD HH:mm:ss') + "' WHERE facebook_mail = '" + infos.facebook_mail + "';";
            wasFound = true;
        }
        if (infos.apple_mail !== undefined && wasFound === false) {
            query += "token = '" + jwtToken + "', token_created_at = '"
                + moment().format('YYYY-MM-DD HH:mm:ss') + "' WHERE apple_mail = '" + infos.apple_mail + "';";
            wasFound = true;
        }
        if (infos.office_mail !== undefined && wasFound === false) {
            query += "token = '" + jwtToken + "', token_created_at = '"
                + moment().format('YYYY-MM-DD HH:mm:ss') + "' WHERE office_mail = '" + infos.office_mail + "';";
            wasFound = true;
        }

        console.debug("query == ", query);
        db.query(query, (err: any, result: any) => {
            if (err || result.affectedRows === 0) {
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

/**
 * updates a row in the users table
 * @param row 
 * @param newValue 
 * @param whereRow 
 * @param whereValue 
 * @param callback 
 */
export const updateInfos = async (
    rows: Array<string>, newValues: Array<string>,
    whereRow: string, whereValue: string, callback: Function) => {
    let query: string = 'UPDATE users SET ';

    for (let i = 0; i < rows.length; i++) {
        if (i !== 0) {
            query += ', ';
        }
        query += rows[i] + ' = ' + `'${newValues[i]}'`;
    }
    query += ' WHERE ' + whereRow + ' = ' + `'${whereValue}'` + ';';

    try {
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

export const getRow = async (row: string, value: string, callback: Function) => {
    let query: string = "SELECT * FROM users WHERE " + row + " = '" + value + "' LIMIT 1;";

    try {
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

export const getWidgetsByUserId = async (userId: string, callback: Function) => {
    let query: string = "SELECT * FROM widgets WHERE user_id = '" + userId + "';";

    try {
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
    }
    catch (err) {
        callback(err);
    }
};

export const updateWidget = async (userId: string, widget: string, callback: Function) => {
    let query: string = "UPDATE widgets SET data = '" + widget + "' WHERE user_id = '" + userId + "';";

    try {
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
    }
    catch (err) {
        callback(err);
    }
}

export const deleteWidget = async (userId: string, widgetId: string, callback: Function) => {
    let query: string = "DELETE FROM widgets WHERE user_id = '" + userId + "' AND id = '" + widgetId + "';";

    try {
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
    }
    catch (err) {
        callback(err);
    }
}

export const addWidget = async (userId: string, widget: string, callback: Function) => {
    let query: string = "INSERT INTO widgets (user_id, data) VALUES ('" + userId + "', '" + JSON.stringify(widget) + "');";

    try {
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
    }
    catch (err) {
        callback(err);
    }
}