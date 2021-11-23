import { ServicesService } from "./../../services/services.service";
import { Component, OnInit } from "@angular/core";
import { SideNavService } from "../../services/side-nav.service";
import { CdkDrag } from "@angular/cdk/drag-drop";
import { Widget } from "../../interfaces/services";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
  public hideSideNav = false;

  constructor(
    public sideNavService: SideNavService,
    public servicesService: ServicesService
  ) {}

  ngOnInit() {}

  evenPredicate(item: CdkDrag<Widget>) {
    return false;
  }
}
