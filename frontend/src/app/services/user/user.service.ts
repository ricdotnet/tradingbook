import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Config} from "../../utils/config";
import {catchError, tap} from "rxjs/operators";
import {UserStore} from "../../store/user.store";
import {User} from "../../interfaces/user.interface";
import {Listeners} from "../../utils/listeners";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private userStore: UserStore,
    private listeners: Listeners
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

  saveUserDetails(body: FormData) {
    return this.listeners.post({
      uri: 'user/details/save',
      body: body,
      headers: new HttpHeaders({
        // 'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${Config.currentUserToken}`
      }),
      observe: 'events',
      reportProgress: true
    })
  }

}