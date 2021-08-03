import {Component, OnInit} from '@angular/core';
import {DashboardService} from 'src/app/services/dashboard/dashboard.service';
import {UserStore} from "../../store/user.store";

import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import {StatsStore} from "../../store/stats.store";

dayjs.extend(relativeTime)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  _loading: boolean = false

  //format the createdAt data to show how long ago was the registration
  _registered: string = ''

  constructor(
    public userStore: UserStore,
    public statsStore: StatsStore,
    public dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this._loading = true;
    this.dashboardService.getStats().subscribe(
      () => {
        console.log('user data fetched,')
        this._registered = dayjs(this.userStore.createdAt).fromNow()
        this._loading = false;
      },
      (error) => console.log(error)
    )
  }

}