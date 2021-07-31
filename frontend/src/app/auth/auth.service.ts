import {Injectable} from "@angular/core";

import { HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../environments/environment";

import {UserStore} from "../store/user.store";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthed = new BehaviorSubject(false)

  constructor(private http: HttpClient, private userStore: UserStore, private router: Router) {
  }

  async authenticate() {
    let token = JSON.parse(<string>localStorage.getItem('auth'))
    if (token) {
      await this.http.post(`${environment.apiUrl}user/authenticate`, {}, {
        headers: {
          'authorization': `Bearer ${token.token}`
        }
      }).subscribe(
        (response: any) => {
          this.userStore.userId = response.userId
          this.isAuthed.next(true)
        },
        () => {
          localStorage.removeItem('auth')
          this.router.navigate(['']).then(() => window.location.reload())
        }
      )
    }
  }
}