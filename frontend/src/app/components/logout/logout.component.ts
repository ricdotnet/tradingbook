import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private route: Router) {
  }

  ngOnInit() {
    this.doLogout()
  }

  doLogout() {
    if(localStorage.getItem('auth'))
      localStorage.removeItem('auth')

    this.route.navigate(['']).then(() => window.location.reload())
  }
}
