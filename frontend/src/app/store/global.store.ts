import {Injectable} from "@angular/core";

@Injectable()
export class GlobalStore {

  activeUrl: string = ''
  loading: boolean = false

  constructor() {
  }

  set isLoading(loading: boolean) {
    this.loading = loading
  }
  get isLoading() {
    return this.loading
  }

  set currentActiveUrl(url: string) {
    this.activeUrl = url
  }
  get currentActiveUrl() {
    return this.activeUrl
  }
}