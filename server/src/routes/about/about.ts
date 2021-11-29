import express from 'express';
import moment from "moment";

class About {
  async get(req: express.Request, res: express.Response) {
    let ip: string = req.ip;
    ip = ip.split(':')[3];
    console.log('ip == ', ip);

    return res.status(200).json({
      "client": {
        "host": ip,
      },
      "server": {
        "current_time": moment().unix(),
        "services": [
          {
            "name": "weather",
            "widgets": [
              {
                "name": "city_temperature",
                "description": "Display temperature for a city",
                "params": [
                  {
                    "name": "city",
                    "type": "string",
                  }
                ]
              },
              {
                "name": "city_weather",
                "description": "Display weather for a city",
                "params": [
                  {
                    "name": "city",
                    "type": "string",
                  }
                ]
              }
            ]
          },{
            "name": "currency",
            "widgets": [
              {
                "name": "currency_converter",
                "description": "Display the exchange rate of a currency",
                "params": [
                  {
                    "name": "from",
                    "type": "string",
                  },
                  {
                    "name": "to",
                    "type": "string",
                  }
                ]
              }
            ]
          },{
            "name": "nasa",
            "widgets": [
              {
                "name": "apod",
                "description": "Display the Astronomy Picture of the Day",
                "params": [
                  {
                    "name": "date",
                    "type": "string",
                  }
                ]
              },
              {
                "name": "curiosity_image",
                "description": "Display an image from a curiosity",
                "params": [
                  {
                    "name": "date",
                    "type": "string",
                  },
                  {
                    "name": "camera",
                    "type": "string",
                  }
                ]
              }
            ]
          },{
            "name": "intra_epitech",
            "widgets": [
              {
                "name": "intra_epitech_profile",
                "description": "Display the profile of an intra epitech user",
                "params": [
                  {
                    "name": "autologin",
                    "type": "string",
                  }
                ]
              },{
                "name": "intra_epitech_partners",
                "description": "Display the partners of an intra epitech user",
                "params": [
                  {
                    "name": "autologin",
                    "type": "string",
                  }
                ]
              },{
                "name": "intra_epitech_notifications",
                "description": "Display the notifications of an intra epitech user",
                "params": [
                  {
                    "name": "autologin",
                    "type": "string",
                  }
                ]
              }
            ]
          }
        ]
      }
    });
  }
};

module.exports = new About();