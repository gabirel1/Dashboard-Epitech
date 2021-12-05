import { Service, Widget } from "./../interfaces/services";
import { DataService } from "./../../../services/data.service";
import { Injectable } from "@angular/core";
import { weatherTemperatureRefresh } from "src/app/components/widgets/weather/weather-temperature/weather-temperature.component";
import { currencyConverterRefresh } from "src/app/components/widgets/currency/currency-converter/currency-converter.component";
import { nasaPictureOfTheDayRefresh } from "src/app/components/widgets/nasa/nasa-picture-of-the-day/nasa-picture-of-the-day.component";
import { weatherCityRefresh } from "src/app/components/widgets/weather/weather-city/weather-city.component";
import { nasaPictureRoverRefresh } from "src/app/components/widgets/nasa/nasa-picture-rover/nasa-picture-rover.component";
import { intraProfileRefresh } from "src/app/components/widgets/intra/intra-profile/intra-profile.component";
import { intraPartnersRefresh } from "src/app/components/widgets/intra/intra-partners/intra-partners.component";
import { intraNotificationsRefresh } from "src/app/components/widgets/intra/intra-notifications/intra-notifications.component";
import { intraGradesRefresh } from "src/app/components/widgets/intra/intra-grades/intra-grades.component";
import { lolProfileRefresh } from "src/app/components/lol/lol-profile/lol-profile.component";
import { officeCalendarEventsRefresh } from "src/app/components/widgets/office/office-calendar-events/office-calendar-events.component";
import { gmailInboxRefresh } from "src/app/components/widgets/gmail/gmail-inbox/gmail-inbox.component";
import { spotifyTracklistRefresh } from "src/app/components/widgets/spotify/spotify-tracklist/spotify-tracklist.component";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  private _services: Service[] = [];

  private _widgetsFuncs = {
    city_temperature: weatherTemperatureRefresh,
    city_weather: weatherCityRefresh,
    currency_converter: currencyConverterRefresh,
    apod: nasaPictureOfTheDayRefresh,
    curiosity_image: nasaPictureRoverRefresh,
    intra_epitech_profile: intraProfileRefresh,
    intra_epitech_partners: intraPartnersRefresh,
    intra_epitech_notifications: intraNotificationsRefresh,
    intra_epitech_grades: intraGradesRefresh,
    league_of_legends_summoner_profile: lolProfileRefresh,
    office_calendar_events: officeCalendarEventsRefresh,
    gmail_inbox: gmailInboxRefresh,
    spotify_tracklist: spotifyTracklistRefresh
  };

  constructor(private dataService: DataService) {}

  fetchServices() {
    this.dataService.sendGetRequest("about.json").subscribe({
      next: (data) => {
        this._services = data.server.services;
        this._services.forEach((service) => {
          service.widgets.forEach((widget) => {
            widget.serviceName = service.name;
          });
        });
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

  getServiceParameter(serviceName: string, parameterName: string) {
    const params = localStorage.getItem(serviceName);
    if (params) {
      return JSON.parse(params)[parameterName];
    }
    return null;
  }

  saveServiceParameter(serviceName: string, parameterName: string, value: any) {
    const params = localStorage.getItem(serviceName);
    const parsedParams = JSON.parse(params || "{}");
    parsedParams[parameterName] = value;
    localStorage.setItem(serviceName, JSON.stringify(parsedParams));
  }

  isServiceEnabled(service: Service): boolean {
    const servicesEnabled = JSON.parse(
      localStorage.getItem("servicesEnabled") || "[]"
    );
    return servicesEnabled.includes(service.name);
  }
}
