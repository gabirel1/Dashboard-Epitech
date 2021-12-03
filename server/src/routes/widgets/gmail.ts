import express from 'express';
import axios, { AxiosResponse } from 'axios';

class Gmail {
    async getLastFiveMail(req: express.Request, res: express.Response) {
        try {
            const { google_api_key, max_results } = req.body;
            let mail: string = "";

            let response: AxiosResponse =  await axios({
                method: 'GET',
                url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
                headers: {
                    'Authorization': `Bearer ${google_api_key}`
                },
            });
            mail = response.data.email;
            const url = `https://gmail.googleapis.com/gmail/v1/users/${mail}/messages?maxResults=${max_results}`;
            let response2: AxiosResponse = await axios({
                method: 'GET',
                url: url,
                headers: {
                    'Authorization': `Bearer ${google_api_key}`
                },
            });
            let messageIds: Array<string> = [];
            response2.data.messages.forEach((message: any) => {
                messageIds.push(message.id);
            });
            let messages: Array<any> = [];
            for (let i = 0; i < messageIds.length; i++) {
                let response3: AxiosResponse = await axios({
                    method: 'GET',
                    url: `https://gmail.googleapis.com/gmail/v1/users/${mail}/messages/${messageIds[i]}`,
                    headers: {
                        'Authorization': `Bearer ${google_api_key}`
                    },
                });
                messages.push(response3.data);
            }
            return res.status(200).json({
                success: true,
                messages: messages
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
}

export default new Gmail();