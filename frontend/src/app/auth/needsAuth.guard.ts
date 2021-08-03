import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {UserStore} from "../store/user.store";

@Injectable({
  providedIn: 'root'
})
export class NeedsAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private userStore: UserStore
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<any> {
    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/notfound'])
      return false;
    }

    this.authService.authenticate().subscribe(
      (_) => {
        return true;
      },
      () => {
        return false;
      }
    )

    return true;
  }
}
