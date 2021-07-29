import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

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
    this.loginService.doLogin(this.loginForm.value)
  }
}
