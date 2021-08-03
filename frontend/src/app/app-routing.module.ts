import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { NoAuthGuard } from "./auth/noAuth.guard";

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TradesComponent } from "./components/trades/trades.component";
import { NeedsAuthGuard } from "./auth/needsAuth.guard";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ToastService } from './services/toast/toast.service';
import { AuthService } from './auth/auth.service';
import { UserStore } from './store/user.store';

const routes: Routes = [
  { path: '', component: HomeComponent },

  /*
  auth and register routes
   */
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [NeedsAuthGuard] },

  /*
  user routes
   */
  { path: 'dashboard', component: DashboardComponent, canActivate: [NeedsAuthGuard] },
  { path: 'trades', component: TradesComponent, canActivate: [NeedsAuthGuard] },

  /*
  404 path
   */
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {
  constructor(
    private router: Router,
    public toastService: ToastService
  ) {
    router.events.subscribe(() => {
      this.resetToast();
    });
    
    
  }

  //reset the toast message on route change
  resetToast() {
    this.toastService.clearToast();
  }
}
