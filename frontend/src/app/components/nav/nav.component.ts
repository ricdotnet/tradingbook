import { Component } from '@angular/core';
import { UserStore } from 'src/app/store/user.store';
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  constructor(public authService: AuthService, public userStore: UserStore) {
  }

}
