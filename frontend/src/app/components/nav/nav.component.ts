import {Component} from '@angular/core';
import {UserStore} from 'src/app/store/user.store';
import {GlobalStore} from "../../store/global.store";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  api: string = ''

  constructor(
    public userStore: UserStore,
    public globalStore: GlobalStore
  ) {
    this.api = environment.apiUrl
  }

}
