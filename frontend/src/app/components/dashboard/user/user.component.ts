import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {User} from "../../../interfaces/user.interface";
import {ToastService} from "../../../services/toast/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

  currentUser = <User>{}
  modified: boolean = false

  constructor(
    public toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    Object.assign(this.currentUser, this.user)
  }

  @Input()
  user = <User>{}

  saveNewDetails() {
    if(!this.modified)
      return;
  }

  ngOnDestroy(): void {
    // if(this.modified)
    //   alert('sure you want to leave? you have unsaved changes...')
  }

}
