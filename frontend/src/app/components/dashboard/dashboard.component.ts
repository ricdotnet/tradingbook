import {Component, OnInit} from '@angular/core';
import {UserStore} from "../../store/user.store";

import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import {ActivatedRoute} from "@angular/router";
import {GlobalStore} from "../../store/global.store";
import {StatsService} from "../../services/stats/stats.service";
import {StatsStore} from "../../store/stats.store";

dayjs.extend(relativeTime)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  _loading: boolean = false

  constructor(
    public userStore: UserStore,
    public statsService: StatsService,
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore,
    public statsStore: StatsStore
  ) {
    this._loading = true
    this.statsService.getStats().subscribe(
      () => {
        this._loading = false
      }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(
      url => {
        this.globalStore.currentActiveUrl = url[0].path
      }
    )
  }

}