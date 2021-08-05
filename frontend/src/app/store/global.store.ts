import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {

  activeUrl: string = ''

  constructor() {
  }

  set currentActiveUrl(url: string) {
    this.activeUrl = url
  }
  get currentActiveUrl() {
    return this.activeUrl
  }
}