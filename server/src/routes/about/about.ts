import express from "express";
import moment from "moment";

class About {
  /**
   * retrieve general informations and a list of services and their widgets awailable in the dashboard
   * @param {express.Request} req
   * @param {express.Response} res
   * @returns
   */
  async get(req: express.Request, res: express.Response) {
    let ip: string = req.ip;
    ip = ip.split(":")[3];

    return res.status(200).json({
      client: {
        host: ip,
      },
      server: {
        current_time: moment().unix(),
        services: [
          {
            name: "weather",
            display_name: "Weather",
            api_url: "http://api.openweathermap.org",
            params: [
              {
                name: "api_key",
                type: "string",
              },
            ],
            widgets: [
              {
                name: "city_temperature",
                display_name: "City temperature",
                description: "Display temperature for a city",
                params: [
                  {
                    name: "city",
                    type: "string",
                  },
                ],
              },
              {
                name: "city_weather",
                display_name: "City weather",
                description: "Display weather for a city",
                params: [
                  {
                    name: "city",
                    type: "string",
                  },
                ],
              },
            ],
          },
          {
            name: "currency",
            display_name: "Currency Converter",
            api_url: "https://freecurrencyapi.net/",
            params: [
              {
                name: "api_key",
                type: "string",
              },
            ],
            widgets: [
              {
                name: "currency_converter",
                display_name: "Currency Converter",
                description: "Display the exchange rate of a currency",
                params: [
                  {
                    name: "from",
                    type: "string",
                  },
                  {
                    name: "to",
                    type: "string",
                  },
                ],
              },
            ],
          },
          {
            name: "nasa",
            display_name: "NASA",
            api_url: "https://api.nasa.gov/",
            params: [
              {
                name: "api_key",
                type: "string",
              },
            ],
            widgets: [
              {
                name: "apod",
                display_name: "Astronomy Picture of the Day",
                description: "Display the Astronomy Picture of the Day",
                params: [
                  {
                    name: "date",
                    type: "string",
                  },
                ],
              },
              {
                name: "curiosity_image",
                display_name: "Curiosity Rover Image",
                description: "Display an image from a curiosity",
                params: [
                  {
                    name: "date",
                    type: "string",
                  },
                  {
                    name: "camera",
                    type: "string",
                  },
                ],
              },
            ],
          },
          {
            name: "intra_epitech",
            display_name: "Intra Epitech",
            params: [],
            api_url: "https://intra.epitech.eu/admin/autolog",
            widgets: [
              {
                name: "intra_epitech_profile",
                display_name: "Profile",
                description: "Display the profile of an intra epitech user",
                params: [
                  {
                    name: "autologin",
                    type: "string",
                  },
                ],
              },
              {
                name: "intra_epitech_partners",
                display_name: "Partners",
                description: "Display the partners of an intra epitech user",
                params: [
                  {
                    name: "autologin",
                    type: "string",
                  },
                ],
              },
              {
                name: "intra_epitech_notifications",
                display_name: "Notifications",
                description:
                  "Display the notifications of an intra epitech user",
                params: [
                  {
                    name: "autologin",
                    type: "string",
                  },
                ],
              },
              {
                name: "intra_epitech_grades",
                display_name: "Grades",
                description: "Display the grades of an intra epitech user",
                params: [
                  {
                    name: "autologin",
                    type: "string",
                  },
                ],
              },
            ],
          },
          {
            name: "epitech_doors",
            display_name: "Epitech Doors",
            params: [
              {
                name: "intra_autologin",
                type: "string",
              },
            ],
            api_url: "https://intra.epitech.eu/admin/autolog",
            widgets: [
              {
                name: "epitech_doors_open_door",
                display_name: "Open door",
                description: "Open the door in epitech montpellier",
                params: [
                  {
                    name: "door_name",
                    type: "string",
                  },
                  {
                    name: "intra_autologin",
                    type: "string",
                  },
                ],
              },
            ],
          },
          {
            name: "office",
            display_name: "Office 365",
            params: [
              {
                name: "office_token",
                type: "string",
              },
            ],
            api_url: "https://graph.microsoft.com/v1.0/me/",
            widgets: [
              {
                name: "office_calendar_events",
                display_name: "Calendar events",
                description: "Display the calendar events of an office user",
                params: [
                  {
                    name: "start_date",
                    type: "string",
                  },
                  {
                    name: "end_date",
                    type: "string",
                  },
                ],
              },
            ],
          },
          {
            name: "league_of_legends",
            display_name: "League of Legends",
            params: [
              {
                name: "api_key",
                type: "string",
              },
            ],
            api_url: "",
            widgets: [
              {
                name: "league_of_legends_summoner_profile",
                display_name: "Summoner profile",
                description:
                  "Display the summoner profile of a league of legends user",
                params: [
                  {
                    name: "summoner_name",
                    type: "string",
                  },
                  {
                    name: "region",
                    type: "string",
                  },
                ],
              },
            ],
          },
          {
            name: "gmail",
            display_name: "Gmail",
            params: [
              {
                name: "google_api_key",
                type: "string",
              },
            ],
            api_url: "google",
            widgets: [
              {
                name: "gmail_inbox",
                display_name: "Inbox",
                description: "Display the inbox of a gmail user",
                params: [
                  {
                    name: "max_results",
                    type: "number",
                  },
                ],
              },
            ],
          },
          {
            name: "spotify",
            display_name: "Spotify",
            params: [],
            api_url: "spoitfy.com",
            widgets: [
              {
                name: "spotify_tracklist",
                display_name: "Tracklist",
                description: "Display the tracklist of a spotify playlist",
                params: [
                  {
                    name: "playlist_id",
                    type: "string",
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  }
}

module.exports = new About();
