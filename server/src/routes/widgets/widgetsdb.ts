import express from 'express';
import { getWidgetsByUserId, getUserByToken, addWidget, updateWidget } from '../../database/databaseActions';
import jwt from 'jsonwebtoken';

class WidgetsDB {

    /**
     * retrieves the user's widgets from the database
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async get(req: express.Request, res: express.Response) {
        try {
            let token: string = req.headers.authorization;

            if (!token) {
                return res.status(401).json({
                    valid: false,
                    message: "token not found"
                });
            }
            token = token.split(" ")[1];
            const decoded: string | jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded) {
                return res.status(401).json({
                    valid: false,
                    message: "token invalid"
                });
            }
            await getUserByToken(token, async(err: any, user: any) => {
                if (err) {
                    console.debug(err);
                    return res.status(500).json({
                        valid: false,
                        message: "error"
                    });
                } else {
                    if (user.length === 0) {
                        return res.status(404).json({
                            valid: false,
                            message: "user not found"
                        });
                    } else {
                        let userId = user[0]['id'];
                        await getWidgetsByUserId(userId, (err: any, result: any) => {
                            if (err) {
                                console.debug(err);
                                return res.status(500).json({
                                    valid: false,
                                    message: "error"
                                });
                            }
                            return res.status(200).json({
                                valid: true,
                                message: "success",
                                data: result
                            });
                        });
                    }
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                valid: false,
                message: "token invalid"
            });
        }
    }

    /**
     * Update the user's widgets in database if it existed before, otherwise create a new one
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @returns 
     */
    async patch(req: express.Request, res: express.Response) {
        try {
            let token: string = req.headers.authorization;
            const { widgets } = req.body;            

            if (!token) {
                return res.status(401).json({
                    valid: false,
                    message: "token not found"
                });
            }
            token = token.split(" ")[1];
            const decoded: string | jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded) {
                return res.status(401).json({
                    valid: false,
                    message: "token invalid"
                });
            }
            await getUserByToken(token, async(err: any, user: any) => {
                if (err) {
                    console.debug(err);
                    return res.status(500).json({
                        valid: false,
                        message: "error"
                    });
                } else {
                    if (user.length === 0) {
                        return res.status(404).json({
                            valid: false,
                            message: "user not found"
                        });
                    } else {
                        let userId = user[0]['id'];
                        await getWidgetsByUserId(userId, async(err: any, result: any) => {
                            if (err) {
                                console.debug(err);
                                return res.status(500).json({
                                    valid: false,
                                    message: "error"
                                });
                            }
                            if (result.length === 0) {
                                await addWidget(userId, widgets, (err: any, result: any) => {
                                    if (err) {
                                        console.debug(err);
                                        return res.status(500).json({
                                            valid: false,
                                            message: "error"
                                        });
                                    }
                                    return res.status(200).json({
                                        valid: true,
                                        message: "success",
                                        data: result
                                    });
                                });
                            }
                            else {
                                await updateWidget(userId, widgets, (err: any, result: any) => {
                                    if (err) {
                                        console.debug(err);
                                        return res.status(500).json({
                                            valid: false,
                                            message: "error"
                                        });
                                    }
                                    return res.status(200).json({
                                        valid: true,
                                        message: "success",
                                        data: result
                                    });
                                });
                            }
                        });
                    }
                }
            }
        )}
        catch (error) {
            console.log(error);
            return res.status(500).json({
                valid: false,
                message: "error"
            });
        }
    }
};

module.exports = new WidgetsDB();