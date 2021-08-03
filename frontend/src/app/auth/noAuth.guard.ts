import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { UserStore } from "../store/user.store";
import { AuthService } from './auth.service';
@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userStore: UserStore
  ) { }

  canActivate(route: ActivatedRouteSnapshot): any {
    if (!localStorage.getItem('auth')) {
      return true;
    }

    return this.userStore.loggedIn;
  }

}