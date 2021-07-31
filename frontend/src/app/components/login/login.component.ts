import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  _toastMessage: string = ''
  _showToast: boolean = false
  _errorTimeOut = 0

  constructor(
    private loginService: LoginService,
    public lf: FormBuilder
  ) {
    this.loginForm = this.lf.group({
      username: '',
      password: '',
      remember: false
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.loginService.doLogin(this.loginForm.value).subscribe(
      (result) => console.log(result),
      (error) => {
        if(this._showToast) {
          clearTimeout(this._errorTimeOut)
        }
        this._toastMessage = error.error.message
        this._showToast = true
        this._errorTimeOut = setTimeout(() => {
          this._showToast = false
        }, 10000)
      }
    )
  }
}
