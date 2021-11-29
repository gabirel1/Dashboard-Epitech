import { Service } from "./../../pages/dashboard/interfaces/services";
import { ServicesService } from "./../../pages/dashboard/services/services.service";
import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

export interface Profile {
  mail: string;
  google_mail?: any;
  facebook_mail?: any;
  apple_mail?: any;
  office_mail?: any;
}

@Component({
  selector: "app-profile-modal",
  templateUrl: "./profile-modal.component.html",
  styleUrls: ["./profile-modal.component.scss"],
})
export class ProfileModalComponent implements OnInit {
  public profile!: Profile;

  public services: Service[] = [];

  public isLoading = true;

  constructor(
    public activeModal: NgbActiveModal,
    private servicesService: ServicesService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.sendGetRequest("profile").subscribe({
      next: (data) => {
        this.profile = data.result;
        this.isLoading = false;
      },
    });
    this.services = this.servicesService.getServices();
  }

  isServiceEnabled(service: Service): boolean {
    return this.servicesService.isServiceEnabled(service);
  }

  onServiceCheckboxChange(event: any, serviceName: string): void {
    const servicesEnabled = JSON.parse(
      localStorage.getItem("servicesEnabled") || "[]"
    );
    if (event.target.checked) {
      servicesEnabled.push(serviceName);
    } else {
      servicesEnabled.splice(servicesEnabled.indexOf(serviceName), 1);
    }
    localStorage.setItem("servicesEnabled", JSON.stringify(servicesEnabled));
  }
}
