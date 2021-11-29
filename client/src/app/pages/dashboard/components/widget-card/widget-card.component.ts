import { DataService } from "./../../../../services/data.service";
import { ServicesService } from "./../../services/services.service";
import { Widget } from "./../../interfaces/services";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-card",
  templateUrl: "./widget-card.component.html",
  styleUrls: ["./widget-card.component.scss"],
})
export class WidgetCardComponent implements OnInit {
  @Input() widget!: Widget;
  @Input() hideContent?: boolean;
  constructor(
    private servicesService: ServicesService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.widget.widgetState = {
      editMode: false,
      parameters: [...this.widget.params],
    };
    (this.servicesService.getWidgetFunc(this.widget.name) || (() => {}))(
      this.dataService,
      this.servicesService,
      this.widget
    );
  }

  validWidgetEditMode(widget: Widget): void {
    widget.widgetState.editMode = !widget.widgetState.editMode;
    this.servicesService.getWidgetFunc(widget.name)(
      this.dataService,
      this.servicesService,
      widget
    );
  }
}
