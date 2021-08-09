import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

import {Router} from "@angular/router";
import {UserStore} from "../../store/user.store";
import {User} from "../../interfaces/user.interface";
import {Config} from "../../utils/config";

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStore) {
  }

  authenticate(): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}user/authenticate`, {}, {
      headers: {
        'authorization': `Bearer ${Config.currentUserToken}`
      }
    }).pipe(
      tap(_ => {
        this.userStore.loggedIn = true
        this.userStore.userId = _.userId
      }),
      catchError(err => err)
    );
  }

  deAuth(): any {
    if (localStorage.getItem('auth'))
      localStorage.removeItem('auth')

    this.router.navigate(['']).then(() => window.location.reload())
  }

}