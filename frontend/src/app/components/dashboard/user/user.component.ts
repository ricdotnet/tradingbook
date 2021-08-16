import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ToastService} from "../../../services/toast/toast.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {UserStore} from "../../../store/user.store";
import * as dayjs from 'dayjs'
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  detailsForm: FormGroup
  modified: boolean = false
  _loading: boolean = false
  avatar?: File
  uploadProgress: number = 0

  open: boolean = false

  _registered = dayjs(this.userStore.createdAt).format('DD-MM-YYYY')

  constructor(
    public toastService: ToastService,
    private router: Router,
    private df: FormBuilder,
    private userService: UserService,
    public userStore: UserStore,
  ) {
    this.detailsForm = this.df.group({})
  }

  ngOnInit() {
    this.detailsForm = this.df.group({
      firstName: this.userStore.firstName,
      lastName: this.userStore.lastName
    })
  }

  assignNewDetails() {
    if (this.detailsForm.value.firstName !== this.userStore.firstName || this.detailsForm.value.lastName !== this.userStore.lastName) {
      this.modified = true
      return;
    }

    this.modified = false
  }

  assignAvatar(file: any) {
    this.avatar = file.target!.files[0]
    if(this.isAvatarValid(this.avatar!.type)) {
      this.modified = true
      this.toastService.clearToast()
    } else {
      this.toastService.toast('Invalid avatar file type.', 'error', 10000)
    }
  }

  saveNewDetails() {
    this._loading = true
    if (!this.modified)
      return;

    let formBody = new FormData()
    formBody.append('firstName', this.detailsForm.value.firstName)
    formBody.append('lastName', this.detailsForm.value.lastName)

    if (this.avatar)
      formBody.append('avatar', this.avatar)

    this.userService.saveUserDetails(formBody).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.loaded === event.total) {
            this._loading = false
            this.avatar = undefined
            this.modified = false
            this.toastService.toast('Details updated.', 'success', 10000)
            this.userStore.firstName = this.detailsForm.value.firstName
            this.userStore.lastName = this.detailsForm.value.lastName
            this.userService.getUserDetails()
          }
        }
      }
    )
  }

  /**
   * Validators
   */
  isAvatarValid(type: string): boolean {
    let types = ['image/png', 'image/jpg', 'image/jpeg']
    return types.includes(type)
  }

  /**
   * Helpers
   */
  openUserDetails() {
    this.open = !this.open
  }

}
