import express from 'express';
import moment from "moment";

class About {
  async get(req: express.Request, res: express.Response) {
    let ip: string = req.ip;
    //clean ip
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
          }
        ]
      }
    });
  }
};

module.exports = new About();