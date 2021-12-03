import { ServicesService } from "src/app/pages/dashboard/services/services.service";
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
  constructor(
    private dataService: DataService,
    private servicesService: ServicesService
  ) {}

  public widgets: Widget[] = [];
  private widgetsSave: string = "[]";

  ngOnInit() {
    this.dataService.checkLogin().subscribe({
      error: () => {
        window.location.href = "/login";
      },
    });
    // this.widgets = JSON.parse(localStorage.getItem("widgets") || "[]");
    this.dataService.sendGetRequest("widgets/save").subscribe((data) => {
      this.widgets = JSON.parse(data.data[0].data);

      setInterval(() => {
        // localStorage.setItem(
        //   "widgets",
        //   JSON.stringify(this.widgets.filter((w) => !w.widgetState.toDelete))
        // );
        const data = JSON.stringify(
          this.widgets.filter((w) => !w.widgetState.toDelete)
        );
        if (this.widgetsSave != data) {
          this.dataService
            .sendPatchRequest("widgets/save", {
              widgets: data,
            })
            .subscribe();
          this.widgetsSave = data;
        }
        this.widgets.forEach((widget) => {
          if (this.servicesService.getWidgetFunc(widget.name)) {
            this.servicesService.getWidgetFunc(widget.name)(
              this.dataService,
              this.servicesService,
              widget
            );
          }
        });
      }, 5000);
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
      item.params = item.params.map((param) => ({
        name: param.name,
        type: param.type,
      }));
      event.container.data.push({ ...item });
    }
  }
}
