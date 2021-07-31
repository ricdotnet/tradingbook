import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {LoginService} from "../../services/login/login.service";
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private loginService: LoginService,
    public form: FormBuilder,
    public toastService: ToastService
  ) {
    this.loginForm = this.form.group({
      username: '',
      password: '',
      remember: false
    })
  }

  ngOnInit(): void {
  }

  submit() {
    if(this.formValidate())
      return;

    this.loginService.doLogin(this.loginForm.value).subscribe(
      (result) => console.log(result),
      (error) => {
        this.toastService.toast(error.error.message)
      }
    )
  }

  formValidate() {
    for(const key in this.loginForm.value) {
      if(this.loginForm.value[key] === '') {
        this.toastService.toast(`Please enter a ${key}.`)
        return true;
      }
    }

    return false;
  }
}
