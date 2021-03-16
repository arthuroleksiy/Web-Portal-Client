
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Category } from '../../interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


getUrl = "https://localhost:44313/api/Category";

categories: Category[]
constructor(private http: HttpClient) { }

loadCategories() {
  this.getCategories().subscribe(data => this.categories = data);
}
getCategories() : Observable<Category[]> {
  return this.http.get<Category[]>(this.getUrl).pipe(
    map((data: Category[]) => {
      return data;
    }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
}

}
