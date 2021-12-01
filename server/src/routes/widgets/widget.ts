import express from 'express';
import jwt from 'jsonwebtoken';
import Currency from './currency';
import Nasa from './nasa';
import Temperature from './temperature';
import IntraEpitech from './intraEpitech';
import Office from './office';

class Widget {
    async post(req: express.Request, res: express.Response) {
        let valid: boolean = true;
        const type: string = req.params.type;
        let token: string = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ valid: false, message: "token not found" });
        }
        token = token.split(" ")[1];

        try {
            const decoded: string | jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    
            if (!decoded) {
                return res.status(401).json({ valid: false, message: "token invalid" });
            }
        } catch (error) {
            return res.status(401).json({ valid: false, message: "token invalid" });
        }


        switch (type) {
            case 'currency_converter':
                return await Currency.getExchangeRate(req, res);
            case 'city_temperature':
                return await Temperature.getTemperature(req, res);
            case 'city_weather':
                return await Temperature.getWeather(req, res);
            case 'apod':
                return await Nasa.getNasaDayImage(req, res);
            case 'curiosity_image':
                return await Nasa.getNasaRoverImage(req, res);
            case 'intra_epitech_profile':
                return await IntraEpitech.getProfile(req, res);
            case 'intra_epitech_partners':
                return await IntraEpitech.getPartners(req, res);
            case 'intra_epitech_notifications':
                return await IntraEpitech.getNotifications(req, res);
            case 'intra_epitech_doors':
                return await IntraEpitech.openDoor(req, res);
            case 'intra_epitech_grades':
                return await IntraEpitech.getGrades(req, res);
            case 'office_calendar_events':
                return await Office.getCalendarEvents(req, res);
            default:
                return res.status(404).json({ error: true, message: "widget not found" });
        }
    }
}

module.exports = new Widget();