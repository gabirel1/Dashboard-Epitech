import { Widget } from "./interfaces/services";
import { DataService } from "src/app/services/data.service";
import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) {}

  public widgets: Widget[] = [];

  ngOnInit() {
    this.dataService.checkLogin().subscribe({
      error: () => {
        window.location.href = "/login";
      },
    });
    this.widgets = JSON.parse(localStorage.getItem("widgets") || "[]");

    setInterval(() => {
      localStorage.setItem("widgets", JSON.stringify(this.widgets));
    }, 5000);
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
      item.params = item.params.map((param) => ({
        name: param.name,
        type: param.type,
      }));
      event.container.data.push({ ...item });
    }
  }
}
