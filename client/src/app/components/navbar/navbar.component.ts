import { DataService } from "src/app/services/data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public isLogged = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.checkLogin().subscribe({
      next: (data) => {
        this.isLogged = data;
      },
    });
  }

  logout() {
    this.dataService.logout();
  }
}
