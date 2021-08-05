import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { TradeInterface } from "../../interfaces/trade.interface";
import { catchError, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  getTrades(): Observable<any> {
    return this.http.get(`${environment.apiUrl}trade/all`, {
      headers: {
        'authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('auth')).token}`
      }
    }).pipe(
      tap(_ => _),
      catchError(() => this.authService.deAuth())
    );
  }

  addTrade(body: Object): Observable<any> {
    return this.http.post(`${environment.apiUrl}trade/add`, body, {
      headers: {
        'authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('auth')).token}`
      }
    }).pipe(
      tap(_ => _),
      catchError(err => {
        throw err
      })
    )
  }

}