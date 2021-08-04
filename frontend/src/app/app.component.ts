import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { AuthService } from "./auth/auth.service";
import { UserStore } from './store/user.store';
import {DashboardService} from "./services/dashboard/dashboard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private loginService: AuthService,
    private userStore: UserStore,
    private dashboardService: DashboardService,
    private router: Router
  ) {
    if (localStorage.getItem('auth')) {
      this.loginService.authenticate().subscribe(
        (res) => {
          if(res.status === 401 || res.status === 400) {
            localStorage.removeItem('auth')
            this.router.navigate(['']).then(() => {
              window.location.reload()
            })
          }
          this.dashboardService.getStats().subscribe()
          this.userStore.loggedIn = true;
        },
        (err) => {
          localStorage.removeItem('auth')
          this.router.navigate(['']).then(() => {
            window.location.reload()
          })
        }
      );
    }
  }
}