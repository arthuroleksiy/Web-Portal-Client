import { HttpClient } from '@angular/common/http';
import { Customer } from './../../interfaces/Customer';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

getUrl = "https://localhost:44313/api/Customer";

constructor(private http: HttpClient) { }

loadCustomer() {

}

getCustomers() : Observable<Customer[]> {
  return this.http.get<Customer[]>(this.getUrl).pipe(
    map((data: Customer[]) => {
      return data;
    }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
}

addCustomer(customer: Customer) {
  return this.http.post<Customer>(this.getUrl, customer).pipe(
    catchError(error => {
       return throwError(error);
    }));
  }
}
