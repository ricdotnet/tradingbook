import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast/toast.service";

import {RegisterService} from "../../services/register/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(
    public form: FormBuilder,
    public toastService: ToastService,
    public registerService: RegisterService
  ) {
    this.registerForm = this.form.group({
      username: '',
      password: '',
      passwordRepeat: '',
      email: ''
    })
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.formValidate()) return;

    if (this.passwordsValidate()) return;

    this.registerService.registerAccount(this.registerForm.value).subscribe(
      (result) => console.log(result),
      (error) => console.log(error)
    )
  }

  formValidate() {
    for (const key in this.registerForm.value) {
      if (this.registerForm.value[key] === '') {
        this.toastService.toast((key === 'passwordRepeat') ? 'Please verify your password.' : `Please enter ${(key === 'email') ? 'an' : 'a'} ${key}`)
        return true;
      }
    }

    return false;
  }

  passwordsValidate() {
    if (this.registerForm.value.password !== this.registerForm.value.passwordRepeat) {
      this.toastService.toast('The passwords do not match.');
      return true;
    }

    return false;
  }

}
