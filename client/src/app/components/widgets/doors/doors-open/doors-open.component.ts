import { ServicesService } from "src/app/pages/dashboard/services/services.service";
import { Component, Input, OnInit } from "@angular/core";
import { Widget } from "src/app/pages/dashboard/interfaces/services";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-doors-open",
  templateUrl: "./doors-open.component.html",
  styleUrls: ["./doors-open.component.scss"],
})
export class DoorsOpenComponent implements OnInit {
  @Input() widget!: Widget;
  constructor(
    private dataService: DataService,
    private servicesService: ServicesService
  ) {}

  ngOnInit() {}

  openDoor() {
    const params = this.servicesService.prepareParamsForRequest(this.widget);
    this.dataService
      .sendPostRequest(`widgets/${this.widget.name}`, {
        ...params,
      })
      .subscribe({
        next: (data) => {
          this.widget.widgetState.data = data;
        },
      });
  }
}
