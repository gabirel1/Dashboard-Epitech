import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      mail: "",
      password: "",
    });
  }

  ngOnInit() {
    // this.dataService.checkLogin().then(() => {
    //   window.location.href = "/dashboard";
    // });
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
}
