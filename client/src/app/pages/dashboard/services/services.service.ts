import { Service } from "./../interfaces/services";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  private _services: Service[] = [
    {
      name: "Intranet Epitech",
      widgets: [],
    },
    {
      name: "Météo",
      widgets: [
        {
          name: "Température",
          componentName: "app-weather-temperature",
          widgetState: {
            parameters: {
              city: "Paris",
            },
          }
        },
      ],
    },
    {
      name: "Google",
      widgets: [],
    },
    {
      name: "Facebook",
      widgets: [],
    },
    {
      name: "Microsoft",
      widgets: [],
    },
  ];

  constructor() {}

  getServices() {
    return this._services;
  }
}
