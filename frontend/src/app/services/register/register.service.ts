import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient, private errorService: ErrorService) {
  }

  registerAccount(body: Object): Observable<any> {
    return this._http.post(`${environment.apiUrl}user/register`, body).pipe(
      tap(_ => _)
    );
  }
}
