import { Widget } from "./interfaces/services";
import { DataService } from "src/app/services/data.service";
import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) {}

  public widgets: Widget[] = [
    {
      name: "Widget 1",
      componentName: "app-weather-temperature",
    },
  ];

  ngOnInit() {
    this.dataService.checkLogin().subscribe({
      error: () => {
        window.location.href = "/login";
      },
    });
  }

  drop(event: CdkDragDrop<Widget[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      event.container.data.push(item);
    }
  }
}
