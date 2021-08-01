import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UserStore } from "../../store/user.store";

import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  _registered: any = ''

  constructor(
    public userStore: UserStore,
    public dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(
      (result) => {
        this.setUser(result.user)
      },
      (error) => console.log(error)
    )
  }

  setUser(user: User) {
    this._registered = dayjs(user.createdAt).fromNow()
  }

}
