import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./pages/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoogleLoginProvider, SocialLoginModule } from "angularx-social-login";

@NgModule({
  declarations: [AppComponent, LoginComponent, NavbarComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "653520408818-99bnbmu2puoppkfbgtopg5ajgfncn042.apps.googleusercontent.com"
            ), // your client id
          },
        ],
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
