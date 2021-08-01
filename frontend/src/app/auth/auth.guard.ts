import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import {Observable, of} from 'rxjs';

import {UserStore} from "../store/user.store"
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return of(false)
  }

  constructor(
    private router: Router,
    private userStore: UserStore
  ) { }

}
