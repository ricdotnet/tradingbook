import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../../services/toast/toast.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {UserStore} from "../../../store/user.store";
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  detailsForm: FormGroup
  modified: boolean = false
  _loading: boolean = false

  _registered = dayjs(this.userStore.createdAt).format('DD-MM-YYYY')

  constructor(
    public toastService: ToastService,
    private router: Router,
    private df: FormBuilder,
    private userService: UserService,
    public userStore: UserStore
  ) {
    this.detailsForm = this.df.group({
      firstName: this.userStore.firstName,
      lastName: this.userStore.lastName
    })
  }

  ngOnInit() {}

  assignNewDetails() {
    if (this.detailsForm.value.firstName !== this.userStore.firstName || this.detailsForm.value.lastName !== this.userStore.lastName) {
      this.modified = true
      return;
    }

    this.modified = false
  }

  saveNewDetails() {
    this._loading = true
    if (!this.modified)
      return;

    console.log(this.detailsForm.value)

    this.userService.saveUserDetails(this.detailsForm.value).subscribe(
      (res) => {
        this.toastService.toast(res.message, 'success', 10000)
        this._loading = false
        this.modified = false
      },
      (error) => {
        console.log(error)
        this._loading = false
      }
    )
  }

}
