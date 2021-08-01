import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _http: HttpClient
  ) { }

  getStats(): Observable<any> {
    return this._http.get(`${environment.apiUrl}user/stats`, {
      headers: {
        'authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('auth')).token}`
      }
    }).pipe(
      tap(_ => _),
      catchError(error => of(error))
    )
  }

}
