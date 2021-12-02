import { Component, Input, OnInit } from "@angular/core";
import { Widget } from "src/app/pages/dashboard/interfaces/services";
import { ServicesService } from "src/app/pages/dashboard/services/services.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-intra-partners",
  templateUrl: "./intra-partners.component.html",
  styleUrls: ["./intra-partners.component.scss"],
})
export class IntraPartnersComponent implements OnInit {
  @Input() widget!: Widget;
  constructor() {}

  ngOnInit() {}
}

export async function intraPartnersRefresh(
  dataService: DataService,
  servicesService: ServicesService,
  widget: Widget
): Promise<any> {
  const params = servicesService.prepareParamsForRequest(widget);
  dataService
    .sendPostRequest(`widgets/${widget.name}`, {
      ...params,
    })
    .subscribe({
      next: (data) => {
        widget.widgetState.data = data;
      },
    });
}
