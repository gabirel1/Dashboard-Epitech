# Dashboard

Dashboard is a project which allow users to connect to several services and use widgets linked to them, on one web app.

## Authors :
- [Léo Sarochar](https://github.com/LeoSarochar)
- [Gabriel Knies](https://github.com/gabirel1)
____
## Summary

- ### [Dependencies](#Dependencies)
- ### [How to run](#Howtorun)
- ### [How to implement a widget](#Howtoimplementawidget)
- ### [Documentations](#Documentations)
- ### [Available Services](#AvailableServices)
- ### [Available Widgets](#AvailableWidgets)


### <a name="Dependencies"></a> Dependencies

- ```docker-compose```
- ```docker```

### <a name="Howtorun"></a> How to run

```
docker-compose build
docker-compose up dashboard-database
docker-compose up
```
Once dashboard-database displays the following press : Ctrl+C and start the next command

```dashboard-database    | Version: '5.7.36'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)```

### <a name="Howtoimplementawidget"></a> How to implement a widget (server)

Create a new file :

```server/src/routes/widgets/[widget_name].ts```

- Create a class with the name of your service
- Write your functions (taking ```req: express.Request, res: express.Response``` as arguments) don't forget to make your functions `async`
- You don't have to worry about the authentication token, as it will have already been taken care of once you enter your function.
- Once done, you'll have to add your service and widgets to ```server/src/routes/about/about.ts```
- Once done, go to ```server/src/routes/widgets/widget.ts```

### Example:
```currency.ts```

```ts
import express from 'express';
import axios, { AxiosResponse } from 'axios';

class Currency {
    async getExchangeRate(req: express.Request, res: express.Response) {
        try {
            const { from, to, api_key } = req.body;
            console.log(from, to);
            const url: string = `https://freecurrencyapi.net/api/v2/latest?base_currency=${from}&apikey=${api_key}`;

            let response: AxiosResponse = await axios({
                method: 'get',
                url: url
            });
            let currency: number = response.data.data[to];
            console.log('currency == ', currency);
            return res.status(200).json({
                "base_currency": from,
                "target_currency": to,
                "rate": currency
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default new Currency();
```

```about.ts```

```ts
{
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
},
```

```widget.ts```

```ts
switch (type) {
    case 'currency_converter':
        return await Currency.getExchangeRate(req, res);
}
```

- Add the widget component to the client too :)

### <a name="Documentations"></a> Documentations
- Postman : https://documenter.getpostman.com/view/12393581/UVJhEFRd
- [Server Technical Documentation](documentation/)


## <a name="AvailableServices"></a> Available Services:

- Intranet Epitech
- Nasa
- Currency
- League Of Legends
- Office 365
- Weather
- Gmail

## <a name="AvailableWidgets"></a> Available Widgets:

- Intranet Epitech:
  - Intranet Profile
  - Project Partners
  - Notifications
  - Doors
  - Grades
- Nasa
  - Image of the day
  - Rover Image of the day
- Currency
  - Currency Converter
- League Of Legends
  - Summoner's Profile
- Office 365
  - Calendar Events
- Weather
  - City's temperature
  - City's weather
- Gmail
  - Gmail Inbox

