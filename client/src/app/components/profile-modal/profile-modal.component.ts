import { Service } from "./../../pages/dashboard/interfaces/services";
import { ServicesService } from "./../../pages/dashboard/services/services.service";
import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  GoogleLoginProvider,
  MicrosoftLoginProvider,
  SocialAuthService,
} from "angularx-social-login";

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
    private dataService: DataService,
    private socialAuthService: SocialAuthService
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

  onServiceParameterEdit(
    event: any,
    serviceName: string,
    parameterName: string
  ): void {
    this.servicesService.saveServiceParameter(
      serviceName,
      parameterName,
      event.target.value
    );
  }

  getServiceParameter(serviceName: string, parameterName: string): string {
    return this.servicesService.getServiceParameter(serviceName, parameterName);
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

  async loginWithMicrosoft() {
    const userResponse = await this.socialAuthService.signIn(
      MicrosoftLoginProvider.PROVIDER_ID
    );
    this.dataService
      .sendPatchRequest("profile/update/office_user", {
        access_token: userResponse.response.accessToken,
      })
      .subscribe({
        next: (data) => {
          this.servicesService.saveServiceParameter(
            "office",
            "office_token",
            data.result[0].office_token
          );
        },
      });
  }

  async loginWithGoogle() {
    const userResponse = await this.socialAuthService.signIn(
      GoogleLoginProvider.PROVIDER_ID,
      {
        scope:
          "https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.addons.current.message.action https://www.googleapis.com/auth/gmail.addons.current.message.readonly",
      }
    );
    this.dataService
      .sendPatchRequest("profile/update/google_user", {
        access_token: userResponse.response.access_token,
      })
      .subscribe({
        next: (data) => {
          this.servicesService.saveServiceParameter(
            "gmail",
            "google_api_key",
            data.token
          );
        },
      });
  }
}
