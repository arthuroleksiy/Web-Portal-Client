import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Status} from '../../interfaces/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {

  getUrl = "https://localhost:44313/api/Status";

  statuses: Status[]
  constructor(private http: HttpClient) { }

  loadStatuses() {
    this.getStatuses().subscribe(data => this.statuses = data);
  }

  getStatuses() : Observable<Status[]> {
    return this.http.get<Status[]>(this.getUrl).pipe(
      map((data: Status[]) => {
        return data;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  }
