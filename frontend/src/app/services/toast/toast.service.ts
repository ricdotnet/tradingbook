import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  _showToast: boolean = false
  _toastMessage: string = ''
  _toastTimeOut: any

  constructor() { }

  toast(message: string) {
    if(this._showToast)
      clearTimeout(this._toastTimeOut)

    this._toastMessage = message
    this._showToast = true
    this._toastTimeOut = setTimeout(() => {
      this._showToast = false
      this._toastMessage = ''
    }, 10000)
  }

  clearToast() {
    this._showToast = false
    this._toastMessage = ''
  }
}