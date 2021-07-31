import {Component, AfterContentInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements AfterContentInit {

  isLogged: boolean = false

  constructor(public authService: AuthService) {
    this.authService.isAuthed.subscribe(value => {
      this.isLogged = value
    })
  }

  ngAfterContentInit(): void {
  }

}
