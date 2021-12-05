import { Component, Input, OnInit } from "@angular/core";
import { Widget } from "src/app/pages/dashboard/interfaces/services";
import { ServicesService } from "src/app/pages/dashboard/services/services.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-spotify-tracklist",
  templateUrl: "./spotify-tracklist.component.html",
  styleUrls: ["./spotify-tracklist.component.scss"],
})
export class SpotifyTracklistComponent implements OnInit {
  @Input() widget!: Widget;
  constructor() {}

  ngOnInit() {}
}

export async function spotifyTracklistRefresh(
  dataService: DataService,
  servicesService: ServicesService,
  widget: Widget
): Promise<any> {
  // const params = servicesService.prepareParamsForRequest(widget);
  // dataService
  //   .sendPostRequest(`widgets/${widget.name}`, {
  //     office_token: servicesService.getServiceParameter(
  //       widget.serviceName,
  //       "office_token"
  //     ),
  //     ...params,
  //   })
  //   .subscribe({
  //     next: (data) => {
  //       widget.widgetState.data = data;
  //     },
  //   });
}
