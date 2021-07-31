import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
  }

  doLogin(body: Object): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/login`, body, {
      responseType: "json"
    }).pipe(
      tap(_ => this.loginHandler(_))
    )
  }

  loginHandler(response: Object) {
    localStorage.setItem('auth', JSON.stringify(response))
    this.route.navigate(['']).then(() => window.location.reload())
  }

}