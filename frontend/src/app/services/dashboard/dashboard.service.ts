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
    return this._http.get<Stats>(`${environment.apiUrl}user/stats`, {
      headers: {
        'authorization': `Bearer ${Config.currentUserToken}`
      }
    }).pipe(
      tap(_ => {
        //set user stats
        this.statsStore.trades = _.body.trades
        this.statsStore.topPair = _.topPair
        this.statsStore.pipsWon = _.pipsWon
        this.statsStore.pipsLost = _.pipsLost
      }),
      catchError((err) => Array(err))
    )
  }

}
