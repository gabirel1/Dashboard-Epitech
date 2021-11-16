import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
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
        .sendPostRequest("auth/register", this.loginForm.value)
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
        .sendPostRequest("auth/login", this.loginForm.value)
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

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(() => this.router.navigate(['dashboard']));
  }
}
