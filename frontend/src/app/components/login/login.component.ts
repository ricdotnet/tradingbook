import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { LoginService } from "../../services/login/login.service";
import { ToastService } from "../../services/toast/toast.service";
import { SpinnerIcon } from 'src/app/icons/spinner.icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  _loading: boolean = false;

  constructor(
    private loginService: LoginService,
    public form: FormBuilder,
    public toastService: ToastService
  ) {
    this.loginForm = this.form.group({
      username: '',
      password: '',
      remember: false
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this._loading = true;
    if (this.formValidate()) {
      this._loading = false;
      return;
    }

    this.loginService.doLogin(this.loginForm.value).subscribe(
      (result) => {
        this.toastService.toast(result.message);
        this._loading = false;
      },
      (error) => {
        this.toastService.toast(error.error.message);
        this._loading = false;
      }
    );
  }

  formValidate() {
    for (const key in this.loginForm.value) {
      if (this.loginForm.value[key] === '') {
        this.toastService.toast(`Please enter a ${key}.`);
        return true;
      }
    }

    return false;
  }
}
