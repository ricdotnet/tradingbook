import {Component, OnInit} from '@angular/core';

import {AuthService} from "./auth/auth.service";
import {UserStore} from "./store/user.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TradingBook';

  constructor(private loginService: AuthService) {
  }

  ngOnInit() {
    this.loginService.authenticate().then(() => console.log('authed...'))
  }
}