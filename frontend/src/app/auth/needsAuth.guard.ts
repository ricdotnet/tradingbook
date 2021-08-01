import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserStore } from "../store/user.store";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NeedsAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userStore: UserStore
  ) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<any> {
    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/notfound'])
      return false;
    }

    return this.userStore.loggedIn;
  }
}
