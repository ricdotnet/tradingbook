import {Component} from '@angular/core';
import {UserStore} from 'src/app/store/user.store';
import {GlobalStore} from "../../store/global.store";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  constructor(public userStore: UserStore, public globalStore: GlobalStore) {
  }

}
