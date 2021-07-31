import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./auth/auth.guard";

import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {TradesComponent} from "./components/trades/trades.component";
import {NeedsAuthGuard} from "./auth/needsAuth.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {path: '', component: HomeComponent},

  /*
  auth and register routes
   */
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent, canActivate: [NeedsAuthGuard]},

  /*
  user routes
   */
  {path: 'dashboard', component: DashboardComponent, canActivate: [NeedsAuthGuard]},
  {path: 'trades', component: TradesComponent, canActivate: [NeedsAuthGuard]},

  /*
  404 path
   */
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, NeedsAuthGuard]
})
export class AppRoutingModule {
}
