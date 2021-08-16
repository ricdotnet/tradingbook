import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {catchError, share, tap} from "rxjs/operators";
import {Observable} from "rxjs";

interface EventListener {
  [key: string]: any
}

interface RequestOptions<RequestBody> {
  uri: string
  parameters?: HttpParams
  body?: RequestBody
  headers?: HttpHeaders,
  reportProgress?: boolean,
  observe?: any
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

  post<RequestBody>(options: RequestOptions<RequestBody>): Observable<any> {
    let post = this._http.post(`${environment.apiUrl}${options.uri}`, options.body,
      {
        params: options.parameters,
        headers: options.headers,
        reportProgress: options.reportProgress,
        observe: options.observe
      })
      // .pipe(share())
      .pipe(
        tap(_ => _)
      )
    return post
  }

  get(options: RequestOptions<any>) {
    let get = this._http.get(`${environment.apiUrl}${options.uri}`, {
      headers: options.headers,
      params: options.parameters
    })
      .pipe(
        tap(_ => _)
      )

    return get
  }

}