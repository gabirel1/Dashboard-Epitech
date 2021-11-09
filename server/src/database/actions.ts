import { db } from './database';
import { User } from './schemas';

export const addUser = (user: User, callback: Function) => {
    const queryString: string = "INSERT INTO USERS () VALUES (" + user.mail + ");";
}