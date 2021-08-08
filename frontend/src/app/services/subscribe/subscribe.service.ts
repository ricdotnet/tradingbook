import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalStore} from "../../store/global.store";
import {UserService} from "../user/user.service";
import {UserStore} from "../../store/user.store";
import {Config} from "../../utils/config";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class SubscribeService {

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore,
    private userService: UserService,
    private userStore: UserStore,
    private router: Router
  ) {
    if (Config.currentUserToken) {
      // this.dashboardService.getStats().subscribe()
      this.authService.authenticate().subscribe(
        () => {

          this.userService.getUserDetails().subscribe(
            () => {
              this.globalStore.isLoading = false
              //more user subscribe methods...
            },
            () => console.log('error......')
          )
          this.userStore.loggedIn = true;

        },
        () => {
          localStorage.removeItem('auth')
          this.router.navigate(['']).then(() => {
            window.location.reload()
          })
        }
      );
    }
  }

  setActiveUrl() {
    this.activatedRoute.url.subscribe(
      url => {
        this.globalStore.activeUrl = url[0].path
        console.log(this.globalStore.activeUrl)
      }
    )
  }


}
