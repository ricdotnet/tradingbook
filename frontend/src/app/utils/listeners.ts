import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {share, tap} from "rxjs/operators";

interface EventListener {
  [key: string]: any
}

interface RequestOptions<RequestBody> {
  uri: string
  parameters?: HttpParams
  body?: RequestBody
  headers?: HttpHeaders
}

@Injectable()
export class Listeners {

  constructor(
    private _http: HttpClient
  ) {
  }

  useDOMEvent(events: EventListener) {
    window.addEventListener(events.event, events.func, false)
  }

  post<RequestBody>(options: RequestOptions<RequestBody>) {
    let post = this._http.post(`${environment.apiUrl}${options.uri}`, options.body,
      {params: options.parameters, headers: options.headers})
      .pipe(share())

    return post
  }

  get(options: RequestOptions<any>) {
    let get = this._http.get(`${environment.apiUrl}${options.uri}`, {headers: options.headers})
      .pipe(
        tap(_ => _)
      )

    return get
  }

}