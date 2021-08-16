import {Injectable} from '@angular/core';
import {ToastService} from "../toast/toast.service";
import {Listeners} from "../../utils/listeners";
import {HttpHeaders} from "@angular/common/http";
import {Config} from "../../utils/config";
import {UserStore} from "../../store/user.store";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private _avatar = new BehaviorSubject<string>('');
  avatar$ = this._avatar.asObservable()

  constructor(
    private toastService: ToastService,
    private listeners: Listeners,
    private userStore: UserStore
  ) {
  }

  assignAvatar(event: any) {
    let avatar = event.target!.files[0]
    this.toastService.clearToast()

    if (!this.avatarFileType(avatar)) {
      this.toastService.toast('Invalid file type. Only png and jpg/jpeg are allowed.', 'error', 10000);
      return;
    }

    if(!this.avatarFileSize(avatar)) {
      this.toastService.toast('Your file is too large. Maximum size of 5mb allowed.', 'error', 10000);
      return;
    }

    let formBody = new FormData()
    formBody.append('avatar', avatar)

    this.listeners.post({
      uri: 'user/details/save/avatar',
      body: formBody,
      headers: new HttpHeaders({
        Authorization: `Bearer ${Config.currentUserToken}`
      }),
      // observe: 'events',
      // reportProgress: true
    }).subscribe(_ => {
      this.toastService.toast('Avatar Updated.', 'success', 10000)
      this.userStore.avatar = _.avatar
      this._avatar.next('')
    })
  }

  avatarFileType(file: File): boolean {
    let allowed = ['image/png', 'image/jpeg', 'image/jpg']

    return allowed.includes(file.type)
  }

  avatarFileSize(file: File): boolean {
    return file.size <= 5000000
  }
}
