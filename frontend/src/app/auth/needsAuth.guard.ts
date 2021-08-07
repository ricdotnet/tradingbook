import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {UserStore} from "../store/user.store";
import {ToastService} from "../services/toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class NeedsAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private toastService: ToastService,
    private userStore: UserStore
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/notfound'])
      return false;
    }

    this.authService.authenticate().subscribe(
      () => {
        return true;
      },
      (_) => {

        this.router.navigate(['login']).then(() => {
          this.toastService.toast('Login token expired. Please login again.', 'error')
          this.userStore.loggedIn = false
          localStorage.removeItem('auth')
        })

        return false;
      }
    )

    return true;
  }
}
