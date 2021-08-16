import {Injectable} from '@angular/core';
import {ToastService} from "../toast/toast.service";
import {Listeners} from "../../utils/listeners";
import {HttpHeaders} from "@angular/common/http";
import {Config} from "../../utils/config";

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private toastService: ToastService,
    private listeners: Listeners
  ) {
  }

  assignAvatar(event: any) {
    let avatar = event.target!.files[0]
    this.toastService.clearToast()

    if (!this.avatarFileType(avatar)) {
      this.toastService.toast('Invalid file type. Only png and jpg/jpeg are allowed', 'error', 10000);
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
      window.location.reload()
    })
  }

  avatarFileType(file: File): boolean {
    let allowed = ['image/png', 'image/jpeg', 'image/jpg']

    return allowed.includes(file.type)
  }
}
