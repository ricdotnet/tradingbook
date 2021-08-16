import {Component} from '@angular/core';
import {UserStore} from 'src/app/store/user.store';
import {GlobalStore} from "../../store/global.store";
import {environment} from "../../../environments/environment";
import {Listeners} from "../../utils/listeners";
import {AvatarService} from "../../services/avatar/avatar.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  api: string = ''
  _newAvatar: boolean = false

  constructor(
    public userStore: UserStore,
    public globalStore: GlobalStore,
    private listeners: Listeners,
    public avatarService: AvatarService
  ) {
    this.api = environment.apiUrl

    listeners.useDOMEvent({
      event: 'keyup',
      func: (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this._newAvatar) {
          this.closeModal()
        }
      }
    });
  }

  openModal() {
    this._newAvatar = true
  }
  closeModal() {
    this._newAvatar = false
  }

}
