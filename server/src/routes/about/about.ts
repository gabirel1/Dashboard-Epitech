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
            "display_name": "Weather",
            "api_url": "http://api.openweathermap.org",
            "params": [
              {
                "name": "api_key",
                "type": "string",
              }
            ],
            "widgets": [
              {
                "name": "city_temperature",
                "display_name": "City temperature",
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
                "display_name": "City weather",
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
            "display_name": "Currency Converter",
            "api_url": "https://freecurrencyapi.net/",
            "params": [
              {
                "name": "api_key",
                "type": "string",
              }
            ],
            "widgets": [
              {
                "name": "currency_converter",
                "display_name": "Currency Converter",
                "description": "Display the exchange rate of a currency",
                "params": [
                  {
                    "name": "from",
                    "type": "string",
                  },{
                    "name": "to",
                    "type": "string",
                  }
                ]
              }
            ]
          },{
            "name": "nasa",
            "display_name": "NASA",
            "api_url": "https://api.nasa.gov/",
            "params": [
              {
                "name": "api_key",
                "type": "string",
              }
            ],
            "widgets": [
              {
                "name": "apod",
                "display_name": "Astronomy Picture of the Day",
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
                "display_name": "Curiosity Rover Image",
                "description": "Display an image from a curiosity",
                "params": [
                  {
                    "name": "date",
                    "type": "string",
                  },{
                    "name": "camera",
                    "type": "string",
                  }
                ]
              }
            ]
          },{
            "name": "intra_epitech",
            "display_name": "Intra Epitech",
            "params": [],
            "api_url": "https://intra.epitech.eu/",
            "widgets": [
              {
                "name": "intra_epitech_profile",
                "display_name": "Profile",
                "description": "Display the profile of an intra epitech user",
                "params": [
                  {
                    "name": "autologin",
                    "type": "string",
                  }
                ]
              },{
                "name": "intra_epitech_partners",
                "display_name": "Partners",
                "description": "Display the partners of an intra epitech user",
                "params": [
                  {
                    "name": "autologin",
                    "type": "string",
                  }
                ]
              },{
                "name": "intra_epitech_notifications",
                "display_name": "Notifications",
                "description": "Display the notifications of an intra epitech user",
                "params": [
                  {
                    "name": "autologin",
                    "type": "string",
                  }
                ]
              },{
                "name": "intra_epitech_grades",
                "display_name": "Grades",
                "description": "Display the grades of an intra epitech user",
                "params": [
                  {
                    "name": "autologin",
                    "type": "string",
                  }
                ]
              },{
                "name": "intra_epitech_doors",
                "display_name": "Open doors",
                "description": "Open the door in epitech montpellier",
                "params": [
                  {
                    "name": "autologin",
                    "type": "string",
                  },{
                    "name": "door_name",
                    "type": "string",
                  }
                ]
              }
            ]
          },{
            "name": "office",
            "display_name": "Office 365",
            "params": [],
            "api_url": "https://graph.microsoft.com/v1.0/me/",
            "widgets": [
              {
                "name": "office_calendar_events",
                "display_name": "Calendar events",
                "description": "Display the calendar events of an office user",
                "params": [
                  {
                    "name": "start_date",
                    "type": "string",
                  },{
                    "name": "end_date",
                    "type": "string",
                  },{
                    "name": "office_token",
                    "type": "string",
                  }
                ]
              }
            ]
          },{
            "name": "league_of_legends",
            "display_name": "League of Legends",
            "params": [
              {
                "name": "api_key",
                "type": "string",
              }
            ],
            "api_url": "",
            "widgets": [
              {
                "name": "league_of_legends_summoner_profile",
                "display_name": "Summoner profile",
                "description": "Display the summoner profile of a league of legends user",
                "params": [
                  {
                    "name": "summoner_name",
                    "type": "string",
                  },{
                    "name": "region",
                    "type": "string",
                  },{
                    "name": "api_key",
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