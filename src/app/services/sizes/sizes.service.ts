import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Size} from '../../interfaces/Size';
@Injectable({
  providedIn: 'root'
})
export class SizesService {

getUrl = "https://localhost:44313/api/Size";
Sizes: Size[]
constructor(private http: HttpClient) { }

loadCategories() {
  this.getSizes().subscribe(data => this.Sizes = data);
}

getSizes() : Observable<Size[]> {
  return this.http.get<Size[]>(this.getUrl).pipe(
    map((data: Size[]) => {
      return data;
    }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
}

}
