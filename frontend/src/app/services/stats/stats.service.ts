import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StatsStore} from "../../store/stats.store";
import {Observable} from "rxjs";
import {Stats} from "../../interfaces/user.interface";
import {environment} from "../../../environments/environment";
import {Config} from "../../utils/config";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class StatsService {

  constructor(
    private _http: HttpClient,
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
        this.statsStore.topPair = _.body.topPair.pair
        this.statsStore.topPairCount = _.body.topPair.count
        this.statsStore.pipsWon = _.body.pipsWon
        this.statsStore.pipsLost = _.body.pipsLost
        this.statsStore.wins = _.body.results.wins
        this.statsStore.losses = _.body.results.losses
        this.statsStore.open = _.body.results.open
      }),
      catchError((err) => Array(err))
    )
  }
}
