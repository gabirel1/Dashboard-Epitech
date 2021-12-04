import express from 'express';
import axios, { AxiosResponse } from 'axios';

class Office {

    /**
     * retrieves the office calendar events from start to end date from the office api
     * @param {express.Request} req
     * @param {express.Response} res 
     * @returns 
     */
    async getCalendarEvents(req: express.Request, res: express.Response) {
        try {
            const { start_date, office_token, end_date } = req.body;
            
            const url = `https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=${start_date}&enddatetime=${end_date}`;
    
            let response: AxiosResponse = await axios({
                method: 'GET',
                url,
                headers: {
                    'Authorization': `Bearer ${office_token}`
                }
            });
            return res.status(200).json(response.data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default new Office();