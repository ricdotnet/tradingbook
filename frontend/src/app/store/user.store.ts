import {Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private _loggedIn: boolean = false;

  private _userId: string
  private _username: string
  private _email: string
  private _firstName: string
  private _lastName: string
  private _createdAt: any
  private _avatar: string
  constructor() {
    this._userId = ''
    this._username = ''
    this._email = ''
    this._firstName = ''
    this._lastName = ''
    this._createdAt = ''
    this._avatar = ''
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

  set username(username: string) {
    this._username = username
  }
  get username() {
    return this._username
  }

  set email(email: string) {
    this._email = email
  }
  get email() {
    return this._email
  }

  set firstName(firstName: string) {
    this._firstName = firstName
  }
  get firstName() {
    return this._firstName
  }

  set lastName(lastName: string) {
    this._lastName = lastName
  }
  get lastName(): any {
    return this._lastName
  }

  set createdAt(createdAt: any) {
    this._createdAt = createdAt
  }
  get createdAt() {
    return this._createdAt
  }

  set avatar(avatar: string) {
    this._avatar = avatar
  }
  get avatar(): string {
    return this._avatar
  }

}