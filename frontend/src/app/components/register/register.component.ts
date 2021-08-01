import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastService } from "../../services/toast/toast.service";

import { RegisterService } from "../../services/register/register.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  _loading: boolean = false;

  constructor(
    public form: FormBuilder,
    public toastService: ToastService,
    public registerService: RegisterService,
    public router: Router
  ) {
    this.registerForm = this.form.group({
      username: '',
      password: '',
      passwordRepeat: '',
      email: ''
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this._loading = true;

    if (this.formValidate()) return;
    if (this.passwordsValidate()) return;

    this.registerService.registerAccount(this.registerForm.value).subscribe(
      (result) => {
        this.toastService.toast(result.message);
        this.router.navigate(['login']).then(() => window.location.reload());
        this._loading = false;
      },
      (error) => {
        this.toastService.toast(error.error.message);
        this._loading = false;
      }
    );
  }

  formValidate() {
    for (const key in this.registerForm.value) {
      if (this.registerForm.value[key] === '') {
        this.toastService.toast((key === 'passwordRepeat') ? 'Please verify your password.' : `Please enter ${(key === 'email') ? 'an' : 'a'} ${key}`);
        this._loading = false;
        return true;
      }
    }

    return false;
  }

  passwordsValidate() {
    if (this.registerForm.value.password !== this.registerForm.value.passwordRepeat) {
      this.toastService.toast('The passwords do not match.');
      this._loading = false;
      return true;
    }

    return false;
  }

}
