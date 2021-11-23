import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SideNavService {
  private _isNavBarHidden: boolean = false;

  constructor() {}

  hideNavBar() {
    this._isNavBarHidden = true;
  }

  showNavBar() {
    this._isNavBarHidden = false;
  }

  toogleNavBar() {
    this._isNavBarHidden = !this._isNavBarHidden;
  }

  isNavBarHidden() {
    return this._isNavBarHidden;
  }
}
