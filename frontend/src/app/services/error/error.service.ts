import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation + ' failed: ' + error.error.message);
      return of(error as T);
    };
  }
}
