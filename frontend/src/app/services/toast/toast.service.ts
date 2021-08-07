import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  _showToast: boolean = false
  _toastMessage: string = ''
  _toastType: string = ''
  _toastTimeOut: any

  constructor() { }

  toast(message: string, type: string, timeout: number) {
    if(this._showToast)
      clearTimeout(this._toastTimeOut)

    this._toastMessage = message
    this._toastType = type
    this._showToast = true
    this._toastTimeOut = setTimeout(() => {
      this._showToast = false
      this._toastMessage = ''
    }, timeout)
  }

  clearToast() {
    this._showToast = false
    this._toastMessage = ''
    this._toastType = ''
  }
}