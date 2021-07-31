import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TradeInterface} from "../../interfaces/trade.interface";
import {catchError, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private http: HttpClient) {
  }

  getTrades(): Observable<TradeInterface[]> {
      return this.http.get<TradeInterface[]>(`${environment.apiUrl}trade/all`, {
      headers: {
        'authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('auth')).token}`
      }
    }).pipe(
      tap(_ => _),
      catchError(this.error<TradeInterface[]>('gettingTrades'))
    )
  }

  private error<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation + ' failed: ' + error.error.message)
      return of(error as T);
    }
  }

}