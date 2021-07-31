import { Component, OnInit } from '@angular/core';
import {UserStore} from "../../store/user.store";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(public userStore: UserStore) { }

  ngOnInit(): void {
  }

}
