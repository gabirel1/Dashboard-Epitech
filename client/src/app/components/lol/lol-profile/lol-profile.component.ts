import { Component, Input, OnInit } from "@angular/core";
import { Widget } from "src/app/pages/dashboard/interfaces/services";
import { ServicesService } from "src/app/pages/dashboard/services/services.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-lol-profile",
  templateUrl: "./lol-profile.component.html",
  styleUrls: ["./lol-profile.component.scss"],
})
export class LolProfileComponent implements OnInit {
  @Input() widget!: Widget;
  constructor() {}

  ngOnInit() {}
}

export async function lolProfileRefresh(
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
