import { DataService } from "src/app/services/data.service";
import { Component, OnInit } from "@angular/core";
import { SocialAuthService } from "angularx-social-login";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dataService: DataService,
    public socialAuthServive: SocialAuthService
  ) {}

  ngOnInit() {
    // this.dataService.checkLogin().subscribe({
    //   error: () => {
    //     window.location.href = "/login";
    //   },
    // });
  }
}
