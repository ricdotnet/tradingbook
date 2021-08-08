import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from "./services/auth/auth.service";
import {UserStore} from './store/user.store';
import {DashboardService} from "./services/dashboard/dashboard.service";
import {GlobalStore} from "./store/global.store";
import {UserService} from "./services/user/user.service";
import {SubscribeService} from "./services/subscribe/subscribe.service";
import {ToastService} from "./services/toast/toast.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private userStore: UserStore,
    private dashboardService: DashboardService,
    private userService: UserService,
    public globalStore: GlobalStore,
    private router: Router,
    private subscribeService: SubscribeService,
    public toastService: ToastService
  ) {
    if (localStorage.getItem('auth')) {
      this.globalStore.isLoading = true
    }
  }
}