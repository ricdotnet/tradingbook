import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";

import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthed = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {
  }

  authenticate(): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/authenticate`, {}, {
      headers: {
        'authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('auth')).token}`
      }
    }).pipe(
      tap(_ => _),
      catchError(err => Array(err))
    );
  }

  deAuth(): any {
    if(localStorage.getItem('auth'))
      localStorage.removeItem('auth')

    this.router.navigate(['']).then(() => window.location.reload())
  }

}