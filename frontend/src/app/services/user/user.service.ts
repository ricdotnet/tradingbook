import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Config} from "../../utils/config";
import {catchError, tap} from "rxjs/operators";
import {UserStore} from "../../store/user.store";
import {User} from "../../interfaces/user.interface";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private userStore: UserStore,
    private authService: AuthService
  ) { }

  getUserDetails(): Observable<any> {
    return this._http.get<User>(`${environment.apiUrl}user/details`, {
      headers: {
        'authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('auth')).token}`
      }
    }).pipe(
      tap(_ => {
        this.userStore.userId = _.body.userId
        this.userStore.email = _.body.email
        this.userStore.username = _.body.username
        this.userStore.createdAt = _.body.createdAt
      }),
      catchError(_ => _)
    )
  }

}