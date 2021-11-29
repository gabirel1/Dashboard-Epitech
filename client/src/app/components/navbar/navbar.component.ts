import { DataService } from "src/app/services/data.service";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProfileModalComponent } from "../profile-modal/profile-modal.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public isLogged = false;

  constructor(private dataService: DataService, private modalService: NgbModal) {}

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

  openProfile() {
    this.modalService.open(ProfileModalComponent);
  }
}
