import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from 'src/app/services/auth/auth.service';
import {environment} from 'src/environments/environment';
import {UserStore} from "../../store/user.store";
import {Stats, User} from "../../interfaces/user.interface";
import {StatsStore} from "../../store/stats.store";
import {Config} from "../../utils/config";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _http: HttpClient,
    private authService: AuthService,
    private userStore: UserStore,
    private statsStore: StatsStore
  ) {
  }

  getStats(): Observable<any> {
    return this._http.get<User & Stats>(`${environment.apiUrl}user/stats`, {
      headers: {
        'authorization': `Bearer ${Config.currentUserToken}`
      }
    }).pipe(
      tap(_ => {
        //set user details
        this.userStore.userId = _.userId
        this.userStore.email = _.email
        this.userStore.username = _.username
        this.userStore.createdAt = _.createdAt

        //set user stats
        // this.statsStore.count = _.trades.count
        // this.statsStore.topPair = _.trades.topPair
        // this.statsStore.pipsWon = _.trades.pipsWon
        // this.statsStore.pipsLost = _.trades.pipsLost
      }),
      catchError((err) => Array(err))
    )
  }

}
