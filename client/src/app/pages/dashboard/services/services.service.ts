import { Service, Widget } from "./../interfaces/services";
import { DataService } from "./../../../services/data.service";
import { Injectable } from "@angular/core";
import { weatherTemperatureRefresh } from "src/app/components/widgets/weather/weather-temperature/weather-temperature.component";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  private _services: Service[] = [];

  private _widgetsFuncs = {
    city_temperature: weatherTemperatureRefresh,
  };

  constructor(private dataService: DataService) {}

  fetchServices() {
    this.dataService.sendGetRequest("about.json").subscribe({
      next: (data) => {
        console.log(data);
        this._services = data.server.services;
      },
    });
  }

  prepareParamsForRequest(widget: Widget) {
    return widget.widgetState.parameters.reduce((obj: any, item: any) => {
      obj[item.name] = item.value;
      return obj;
    }, {});
  }

  getServices() {
    return this._services;
  }

  getWidgetFunc(widgetName: string) {
    return this._widgetsFuncs[widgetName as keyof typeof this._widgetsFuncs];
  }
}
