import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  MicrosoftLoginProvider,
  SocialAuthService,
} from "angularx-social-login";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public registerMode = false;
  public loginInvalid = false;
  public loginForm: FormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.formBuilder.group({
      mail: "",
      password: "",
    });
  }

  ngOnInit() {
    this.dataService.checkLogin().subscribe({
      next: () => {
        window.location.href = "/dashboard";
      },
    });
  }

  onSubmit() {
    if (this.registerMode) {
      this.dataService
        .sendPostRequest("auth/register/", this.loginForm.value)
        .subscribe({
          next: () => {
            window.location.href = "/login";
          },
          error: () => {
            this.loginInvalid = true;
          },
        });
    } else {
      this.dataService
        .sendPostRequest("auth/login/", this.loginForm.value)
        .subscribe({
          next: (data) => {
            this.dataService.saveToken(data.token);
            window.location.href = "/dashboard";
          },
          error: () => {
            this.loginInvalid = true;
          },
        });
    }
  }

  registerModeToogle() {
    this.registerMode = !this.registerMode;
    this.loginForm.reset();
  }

  async loginWithGoogle() {
    const userResponse = await this.socialAuthService.signIn(
      GoogleLoginProvider.PROVIDER_ID,
      {
        scope:
          "https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.metadata",
      }
    );
    this.dataService
      .sendPostRequest("auth/OAuth/google_user", {
        access_token: userResponse.response.access_token,
      })
      .subscribe({
        next: (data) => {
          this.dataService.saveToken(data.token);
          window.location.href = "/dashboard";
        },
      });
  }

  async loginWithMicrosoft() {
    const userResponse = await this.socialAuthService.signIn(
      MicrosoftLoginProvider.PROVIDER_ID
    );
    this.dataService
      .sendPostRequest("auth/OAuth/office_user", {
        access_token: userResponse.response.accessToken,
      })
      .subscribe({
        next: (data) => {
          this.dataService.saveToken(data.token);
          window.location.href = "/dashboard";
        },
      });
  }

  async loginWithFacebook() {
    const userResponse = await this.socialAuthService.signIn(
      FacebookLoginProvider.PROVIDER_ID
    );
    this.dataService
      .sendPostRequest("auth/OAuth/facebook_user", {
        access_token: userResponse.authToken,
      })
      .subscribe({
        next: (data) => {
          this.dataService.saveToken(data.token);
          window.location.href = "/dashboard";
        },
      });
  }
}
