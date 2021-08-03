import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import {UserStore} from "../../store/user.store";
import {Stats, User} from "../../interfaces/user.interface";
import {TradeInterface} from "../../interfaces/trade.interface";
import {StatsStore} from "../../store/stats.store";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _http: HttpClient,
    private authService: AuthService,
    private userStore: UserStore,
    private statsStore: StatsStore
  ) { }

  getStats(): Observable<any> {
    return this._http.get<User & Stats>(`${environment.apiUrl}user/stats`, {
      headers: {
        'authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('auth')).token}`
      }
    }).pipe(
      tap(_ => {
        //set user details
        this.userStore.userId = _.user.userId
        this.userStore.email = _.user.email
        this.userStore.username = _.user.username
        this.userStore.createdAt = _.user.createdAt

        //set user stats
        this.statsStore.count = _.trades.count
        this.statsStore.topPair = _.trades.topPair
        this.statsStore.pipsWon = _.trades.pipsWon
        this.statsStore.pipsLost = _.trades.pipsLost
      }),
      catchError((err) => Array(err))
    )
  }

}
