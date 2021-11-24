import { Widget } from "./../../interfaces/services";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-card",
  templateUrl: "./widget-card.component.html",
  styleUrls: ["./widget-card.component.scss"],
})
export class WidgetCardComponent implements OnInit {
  @Input() widget?: Widget;
  constructor() {}

  ngOnInit() {
    this.widget!.widgetState = {
      editMode: false,
      parameters: {},
    };
  }
}
