import {Component, OnInit} from '@angular/core';
import {UserStore} from "../../store/user.store";

import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import {ActivatedRoute} from "@angular/router";
import {GlobalStore} from "../../store/global.store";

dayjs.extend(relativeTime)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  _loading: boolean = false

  //format the createdAt data to show how long ago was the registration
  // _registered: string =this.userStore.createdAt //dayjs(<string>this.userStore.createdAt).fromNow()
  _registered: string = ''

  constructor(
    public userStore: UserStore,
    // public dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore
  ) {}

  ngOnInit(): void {
    this._loading = true;
    this._registered = dayjs(<string>this.userStore.createdAt).fromNow()

    this.activatedRoute.url.subscribe(
      url => {
        this.globalStore.currentActiveUrl = url[0].path
      }
    )

    this._loading = false
  }

}