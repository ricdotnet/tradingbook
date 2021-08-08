import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Config} from "../../utils/config";
import {catchError, tap} from "rxjs/operators";
import {UserStore} from "../../store/user.store";
import {User} from "../../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private userStore: UserStore
  ) { }

  getUserDetails(): Observable<any> {
    return this._http.get<User>(`${environment.apiUrl}user/details`, {
      headers: {
        'authorization': `Bearer ${Config.currentUserToken}`
      }
    }).pipe(
      tap(_ => {
        this.userStore.userId = _.body.userId
        this.userStore.email = _.body.email
        this.userStore.username = _.body.username
        this.userStore.firstName = _.body.firstName || ''
        this.userStore.lastName = _.body.lastName || ''
        this.userStore.createdAt = _.body.createdAt
      }),
      catchError(_ => _)
    )
  }

  saveUserDetails(body: User): Observable<any> {
    this.userStore.firstName = body.firstName!
    this.userStore.lastName = body.lastName!

    return this._http.post(`${environment.apiUrl}user/details/save`, body, {
      headers: {
        'authorization': `Bearer ${Config.currentUserToken}`
      }
    })
  }

}