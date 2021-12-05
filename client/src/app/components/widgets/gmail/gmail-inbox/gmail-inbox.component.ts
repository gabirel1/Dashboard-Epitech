import { Component, Input, OnInit } from "@angular/core";
import { Widget } from "src/app/pages/dashboard/interfaces/services";
import { ServicesService } from "src/app/pages/dashboard/services/services.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-gmail-inbox",
  templateUrl: "./gmail-inbox.component.html",
  styleUrls: ["./gmail-inbox.component.scss"],
})
export class GmailInboxComponent implements OnInit {
  @Input() widget!: Widget;
  constructor() {}

  ngOnInit() {}
}

export async function gmailInboxRefresh(
  dataService: DataService,
  servicesService: ServicesService,
  widget: Widget
): Promise<any> {
  const params = servicesService.prepareParamsForRequest(widget);
  dataService
    .sendPostRequest(`widgets/${widget.name}`, {
      google_api_key: servicesService.getServiceParameter(
        widget.serviceName,
        "google_api_key"
      ),
      ...params,
    })
    .subscribe({
      next: (data) => {
        widget.widgetState.data = data;
      },
    });
}
