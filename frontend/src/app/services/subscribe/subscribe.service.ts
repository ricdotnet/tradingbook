import {Injectable} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GlobalStore} from "../../store/global.store";

@Injectable()
export class SubscribeService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore
  ) { }

  setActiveUrl() {
    this.activatedRoute.url.subscribe(
      url => {
        this.globalStore.activeUrl = url[0].path
        console.log(this.globalStore.activeUrl)
      }
    )
  }


}
