import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private _loggedIn: boolean = false;

  private _userId: string;
  constructor() {
    this._userId = '';
  }

  set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }
  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set userId(userId: string) {
    this._userId = userId;
  }
  get userId() {
    return this._userId;
  }
  // getUserId(): string {
  //   return this.userId
  // }
}