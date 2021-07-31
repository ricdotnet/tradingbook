import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import {Observable, of} from 'rxjs';

import {UserStore} from "../store/user.store"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      if(this.userStore.userId !== '') {
        this.router.navigate([''])
        return of(false)
      }
      return of(true)
  }

  constructor(
    private router: Router,
    private userStore: UserStore
  ) { }

}
