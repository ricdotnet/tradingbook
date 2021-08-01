import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserStore } from "../store/user.store";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NeedsAuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    if (!this.userStore.loggedIn) {
      this.router.navigate(['']);
      return of(false);
    }
    return of(true);
  }

  constructor(
    private router: Router,
    private userStore: UserStore
  ) { }

}
