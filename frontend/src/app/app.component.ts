import { Component, OnInit } from '@angular/core';

import { AuthService } from "./auth/auth.service";
import { UserStore } from './store/user.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TradingBook';

  constructor(private loginService: AuthService, private userStore: UserStore) {
  }

  ngOnInit() {
    if (localStorage.getItem('auth')) {
      this.loginService.authenticate().subscribe(
        () => {
          this.userStore.loggedIn = true
          console.log(this.userStore.loggedIn)
        },
        (error) => console.log(error)
      );
    }
  }
}