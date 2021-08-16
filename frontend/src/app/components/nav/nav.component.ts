import {Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {UserStore} from 'src/app/store/user.store';
import {GlobalStore} from "../../store/global.store";
import {environment} from "../../../environments/environment";
import {AvatarService} from "../../services/avatar/avatar.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit, OnDestroy {

  api: string = ''

  subscription: Subscription | undefined;
  avatarForm: FormGroup

  constructor(
    public userStore: UserStore,
    public globalStore: GlobalStore,
    public avatarService: AvatarService,
    private form: FormBuilder
  ) {
    this.api = environment.apiUrl
    this.avatarForm = form.group({
      avatar: ''
    })
  }

  ngOnInit() {
    this.subscription = this.avatarService.avatar$.subscribe(
      _ => {this.avatarForm.reset()}
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

}
