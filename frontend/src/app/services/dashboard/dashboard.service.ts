import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _http: HttpClient,
    private router: Router
  ) { }

  getStats(): Observable<any> {
    return this._http.get(`${environment.apiUrl}user/stats`, {
      headers: {
        'authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('auth')).token}`
      }
    }).pipe(
      tap(_ => _),
      catchError(() => this.doLogout())
    )
  }

  doLogout(): any {
    if(localStorage.getItem('auth'))
      localStorage.removeItem('auth')

    this.router.navigate(['']).then(() => window.location.reload())
  }

}
