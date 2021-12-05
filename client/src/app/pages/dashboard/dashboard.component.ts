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
      if (data.data[0]) {
        this.widgets = JSON.parse(data.data[0].data);
      }

      setInterval(() => {
        this.widgets.forEach((widget) => {
          if (this.servicesService.getWidgetFunc(widget.name)) {
            this.servicesService
              .getWidgetFunc(widget.name)(
                this.dataService,
                this.servicesService,
                widget
              )
              .catch((e) => {
                console.error("Unable to refresh widget", e);
              });
          }
        });
      }, 5000);
      setInterval(() => {
        if (
          this.widgets.find(
            (w) => w.widgetState.editMode == true && !w.widgetState.toDelete
          )
        )
          return;
        const dupData = JSON.stringify(
          this.widgets.filter((w) => !w.widgetState.toDelete)
        );
        const widgetsDupped = JSON.parse(dupData);
        for (const widget of widgetsDupped) {
          delete widget.widgetState.data;
        }
        const data = JSON.stringify(widgetsDupped);
        if (this.widgetsSave != data) {
          this.dataService
            .sendPatchRequest("widgets/save", {
              widgets: data,
            })
            .subscribe();
          this.widgetsSave = data;
        }
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
