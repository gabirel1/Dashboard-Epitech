import { db } from './database';
import { User } from './schemas';

export const addUser = (user: User, callback: Function) => {
    const queryString: string = "INSERT INTO USERS (mail, password, token) VALUES ('" + user.mail + "', '" + user.password + "', '" + user.token +  "');";
    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            console.debug(result);
            callback(null, result);
        }
    });
}

export const getUser = (user: User, callback: Function) => {
    const queryString: string = "SELECT * FROM USERS WHERE mail = '" + user.mail + "';";
    db.query(queryString, (err: any, result: any) => {
        if (err) {
            callback(err);
        } else {
            console.debug(result);
            callback(null, result);
        }
    });
}

// export const addUser = (user: User,)