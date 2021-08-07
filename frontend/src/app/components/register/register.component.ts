import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast/toast.service";

import {RegisterService} from "../../services/register/register.service";
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalStore} from "../../store/global.store";

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
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore
  ) {
    this.registerForm = this.form.group({
      username: '',
      password: '',
      passwordRepeat: '',
      email: ''
    });
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(
      url => {
        this.globalStore.currentActiveUrl = url[0].path
      }
    )
  }

  submit() {
    this._loading = true;

    if (this.formValidate()) return;
    if (this.passwordsValidate()) return;

    this.registerService.registerAccount(this.registerForm.value).subscribe(
      (result) => {
        this.toastService.toast(result.message, 'success', 10000);
        this.router.navigate(['login']).then(() => window.location.reload());
        this._loading = false;
      },
      (error) => {
        this.toastService.toast(error.error.message, 'error', 10000);
        this._loading = false;
      }
    );
  }

  formValidate() {
    for (const key in this.registerForm.value) {
      if (this.registerForm.value[key] === '') {
        this.toastService.toast((key === 'passwordRepeat') ? 'Please verify your password.' : `Please enter ${(key === 'email') ? 'an' : 'a'} ${key}`, 'error', 10000);
        this._loading = false;
        return true;
      }
    }

    return false;
  }

  passwordsValidate() {
    if (this.registerForm.value.password !== this.registerForm.value.passwordRepeat) {
      this.toastService.toast('The passwords do not match.', 'error', 10000);
      this._loading = false;
      return true;
    }

    return false;
  }

}
