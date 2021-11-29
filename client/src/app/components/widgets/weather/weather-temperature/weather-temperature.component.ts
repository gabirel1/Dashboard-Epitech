import { ServicesService } from "./../../../../pages/dashboard/services/services.service";
import { DataService } from "./../../../../services/data.service";
import { Widget } from "./../../../../pages/dashboard/interfaces/services";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-weather-temperature",
  templateUrl: "./weather-temperature.component.html",
  styleUrls: ["./weather-temperature.component.scss"],
})
export class WeatherTemperatureComponent implements OnInit {
  @Input() widget!: Widget;
  constructor() {}

  ngOnInit() {}
}

export async function weatherTemperatureRefresh(
  dataService: DataService,
  servicesService: ServicesService,
  widget: Widget
): Promise<any> {
  const params = servicesService.prepareParamsForRequest(widget);
  dataService
    .sendPostRequest(`widgets/${widget.name}`, {
      api_key: servicesService.getServiceParameter(
        widget.serviceName,
        "api_key"
      ),
      ...params,
    })
    .subscribe({
      next: (data) => {
        widget.widgetState.data = data;
      },
    });
}
