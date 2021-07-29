import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) {}

  doLogin(body: Object): void {
    this.http.post(`${environment.apiUrl}user/login`, body, {
      responseType: "json"
    }).subscribe(
      (response) => console.log(response),
      (error) => console.log(error.error.message)
    )
  }

}