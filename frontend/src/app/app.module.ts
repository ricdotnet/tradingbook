import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {NavComponent} from './components/nav/nav.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LogoutComponent} from "./components/logout/logout.component";
import {UserIcon} from "./icons/user.icon";
import {AuthGuard} from "./auth/auth.guard";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TradesComponent } from './components/trades/trades.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastComponent } from './components/toast/toast.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    UserIcon,
    LogoutComponent,
    DashboardComponent,
    TradesComponent,
    NotFoundComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
