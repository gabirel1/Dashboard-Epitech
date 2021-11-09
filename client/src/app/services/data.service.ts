import { CookieService } from "ngx-cookie-service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private REST_API_SERVER = "http://localhost:8080";

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  private authToken = "";

  public sendGetRequest(endpoint: string, args: any = {}): Observable<any> {
    let argsStr = "";
    if (args) {
      for (const k in args) {
        if (k) {
          argsStr += (argsStr === "" ? "?" : "&") + k + "=" + args[k];
        }
      }
    }
    return this.httpClient.get(
      this.REST_API_SERVER + "/" + endpoint + argsStr,
      {
        headers: new HttpHeaders().set("Authorization", this.authToken),
      }
    );
  }

  public sendPostRequest(endpoint: string, args: any = {}): Observable<any> {
    args["token"] = this.authToken;
    return this.httpClient.post(this.REST_API_SERVER + "/" + endpoint, args, {
      headers: new HttpHeaders().set("Authorization", this.authToken),
    });
  }

  public sendPutRequest(endpoint: string, args: any = {}): Observable<any> {
    args["token"] = this.authToken;
    return this.httpClient.put(this.REST_API_SERVER + "/" + endpoint, args, {
      headers: new HttpHeaders().set("Authorization", this.authToken),
    });
  }

  public sendPatchRequest(endpoint: string, args: any = {}): Observable<any> {
    args["token"] = this.authToken;
    return this.httpClient.patch(this.REST_API_SERVER + "/" + endpoint, args, {
      headers: new HttpHeaders().set("Authorization", this.authToken),
    });
  }

  public getAuthToken(): string {
    return this.authToken;
  }

  async checkLogin(autologin?: string): Promise<any> {
    return new Promise((res, rej) => {
      const session = autologin
        ? autologin
        : this.authToken != ""
        ? this.authToken
        : this.cookieService.get("dashboard_session");
      this.authToken = session;
      this.sendPostRequest("auth", {}).subscribe(
        (data: any) => {
          res(data);
        },
        (err) => {
          rej(err);
        }
      );
    });
  }

  saveToken(token: string): void {
    this.cookieService.set("dashboard_session", token);
    this.authToken = token;
  }

  logout(): void {
    this.cookieService.delete("dashboard_session");
    window.location.href = "/";
  }
}
