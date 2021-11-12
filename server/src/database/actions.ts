import { db } from './database';
import { User } from './schemas';
import moment from 'moment';
import jwt from 'jsonwebtoken';

export const addUser = (mail: string, username: string, password: string, callback: Function) => {
    const queryString: string = "INSERT INTO users (mail, username, password) VALUES ('" + mail + "', '"
                                + username + "', '" + password + "');";
    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            console.debug(result);
            callback(null, result);
        }
    });
}

export const addGoogleUser = (username: string, googleMail: string, callback: Function) => {
    const queryString: string = "INSERT INTO users (google_mail, username) VALUES ("
                                + "'" + googleMail + "', '" + username + "');";

    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            console.debug(result);
            callback(null, result);
        }
    });
};

export const addAppleUser = (username: string, appleMail: string, callback: Function) => {
    const queryString: string = "INSERT INTO users (apple_mail, username) VALUES ("
                                + "'" + appleMail + "', '" + username + "');";

    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            console.debug(result);
            callback(null, result);
        }
    });
};

export const addFacebookUser = (username: string, facebookMail: string, callback: Function) => {
    const queryString: string = "INSERT INTO users (facebook_mail, username) VALUES ("
                                + "'" + facebookMail + "', '" + username + "');";

    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            console.debug(result);
            callback(null, result);
        }
    });
};

export const getUser = (mail: string, password: string, callback: Function) => {
    const expiresIn: number = Number(process.env.EXPIRE_TIME) || 60 * 60;
    const payload = {
        mail: mail,
    };
    const token: string = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: expiresIn }
    );
    const queryString: string = "SELECT * FROM users WHERE mail = '" + mail + "' AND password = '" + password + "' LIMIT 1;";
    const queryString2: string = " UPDATE users SET token = '" + token + "', token_created_at = '"
                                + moment().format('YYYY-MM-DD HH:mm:ss') + "' WHERE mail = '" + mail
                                + "' AND password = '" + password + "';";
    db.query(queryString2, (err: any, result: any) => {});
    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            console.debug(result);
            callback(null, { "expiresIn": expiresIn, token: token, result });
        }
    });
}

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

export const generateNewToken = (oldToken: string, username: string, callback: Function) => {
    const expiresIn: number = Number(process.env.EXPIRE_TIME) || 60 * 60;
    const payload = {
        username: username,
    };
    const token: string = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: expiresIn }
    );
    // sql query to update a specific user's token with a new one, and token_created_at
    const queryString: string = "UPDATE users SET token = '" + token + "', token_created_at = '"
                                + moment().format('YYYY-MM-DD HH:mm:ss') + "' WHERE username = '"
                                + username + "' AND token = '" + oldToken + "';";
    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            console.debug(result);
            callback(null, { "expiresIn": expiresIn, token: token, result });
        }
    });
};

// export const addUser = (user: User,)