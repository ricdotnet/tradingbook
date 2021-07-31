import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserStore} from "../../store/user.store";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(
    public registerForm: FormBuilder,
    private userStore: UserStore
  ) {
    this.form = this.registerForm.group({
      username: '',
      password: '',
      email: ''
    })
  }

  ngOnInit(): void {
  }

  submit() {
    // console.log(this.form.value)
  }

}
