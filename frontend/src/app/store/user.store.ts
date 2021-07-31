import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private _userId: string;
  constructor() {
    this._userId = ''
  }

  set userId(userId: string) {
    this._userId = userId
  }

  get userId() {
    return this._userId;
  }
  // getUserId(): string {
  //   return this.userId
  // }
}