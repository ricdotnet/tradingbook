import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(
    public registerForm: FormBuilder
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
    console.log(this.form.value)
  }

}
