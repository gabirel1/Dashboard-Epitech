import { IntraNotificationsComponent } from './components/widgets/intra/intra-notifications/intra-notifications.component';
import { IntraPartnersComponent } from './components/widgets/intra/intra-partners/intra-partners.component';
import { IntraProfileComponent } from "./components/widgets/intra/intra-profile/intra-profile.component";
import { NasaPictureRoverComponent } from "./components/widgets/nasa/nasa-picture-rover/nasa-picture-rover.component";
import { WeatherCityComponent } from "./components/widgets/weather/weather-city/weather-city.component";
import { NasaPictureOfTheDayComponent } from "./components/widgets/nasa/nasa-picture-of-the-day/nasa-picture-of-the-day.component";
import { CurrencyConverterComponent } from "./components/widgets/currency/currency-converter/currency-converter.component";
import { ProfileModalComponent } from "./components/profile-modal/profile-modal.component";
import { WeatherTemperatureComponent } from "./components/widgets/weather/weather-temperature/weather-temperature.component";
import { SideNavComponent } from "./pages/dashboard/components/side-nav/side-nav.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./pages/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MicrosoftLoginProvider,
  GoogleLoginProvider,
  SocialLoginModule,
  FacebookLoginProvider,
} from "angularx-social-login";
import { WidgetCardComponent } from "./pages/dashboard/components/widget-card/widget-card.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileModalComponent,
    SideNavComponent,
    WidgetCardComponent,
    WeatherTemperatureComponent,
    WeatherCityComponent,
    CurrencyConverterComponent,
    NasaPictureOfTheDayComponent,
    NasaPictureRoverComponent,
    IntraProfileComponent,
    IntraPartnersComponent,
    IntraNotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    DragDropModule,
    NgbModule,
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
            ),
          },
          {
            id: MicrosoftLoginProvider.PROVIDER_ID,
            provider: new MicrosoftLoginProvider(
              "ddff1f59-f7bc-4314-9015-0c73ad43fd48",
              {
                authority:
                  "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/",
                scopes: ["openid", "profile", "Calendars.Read"],
              }
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("864939734206019"),
          },
        ],
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
