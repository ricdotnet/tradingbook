import {Component, OnInit} from '@angular/core';
import {DashboardService} from 'src/app/services/dashboard/dashboard.service';
import {UserStore} from "../../store/user.store";

import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import {StatsStore} from "../../store/stats.store";
import {ActivatedRoute} from "@angular/router";
import {GlobalStore} from "../../store/global.store";
import {SubscribeService} from "../../services/subscribe/subscribe.service";

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
    public dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore
  ) { }

  ngOnInit(): void {
    this._loading = true;
    this.dashboardService.getStats().subscribe(
      () => {
        this._registered = dayjs(this.userStore.createdAt).fromNow()
        this._loading = false;
      },
      (error) => console.log(error)
    )

    this.activatedRoute.url.subscribe(
      url => {
        this.globalStore.currentActiveUrl = url[0].path
      }
    )
  }

}