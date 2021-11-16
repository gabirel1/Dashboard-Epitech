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
    this.authToken = this.cookieService.get("dashboard_session");
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
        headers: new HttpHeaders().set("Authorization", `token ${this.authToken}`),
      }
    );
  }

  public sendPostRequest(endpoint: string, args: any = {}): Observable<any> {
    this.authToken = this.cookieService.get("dashboard_session");
    return this.httpClient.post(this.REST_API_SERVER + "/" + endpoint, args, {
      headers: new HttpHeaders().set("Authorization", `token ${this.authToken}`),
    });
  }

  public sendPutRequest(endpoint: string, args: any = {}): Observable<any> {
    this.authToken = this.cookieService.get("dashboard_session");
    return this.httpClient.put(this.REST_API_SERVER + "/" + endpoint, args, {
      headers: new HttpHeaders().set("Authorization", `token ${this.authToken}`),
    });
  }

  public sendPatchRequest(endpoint: string, args: any = {}): Observable<any> {
    this.authToken = this.cookieService.get("dashboard_session");
    return this.httpClient.patch(this.REST_API_SERVER + "/" + endpoint, args, {
      headers: new HttpHeaders().set("Authorization", `token ${this.authToken}`),
    });
  }

  public getAuthToken(): string {
    return this.authToken;
  }

  checkLogin(): Observable<any> {
    return this.sendGetRequest('auth/token');
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
