import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient) {
  }

  registerAccount(body: Object): Observable<any> {
    return this._http.post(`${environment.apiUrl}user/register`, body).pipe(
      tap(_ => console.log(_)),
      catchError(err => of(err))
    )
  }
}
