import { HttpClient } from '@angular/common/http';
import { Product } from './../../interfaces/Product';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

getUrl = "https://localhost:44313/api/Product";


products: Product[] = [];

constructor(private http: HttpClient) { }

detailedProduct: Product = {
  productId: 0,
  productName: "",
  categoryId: 0,
  categoryName: "",
  availableQuantity: 0,
  price: 0,
  description: "",
  createDate: new Date(),
  productSizeId: 0,
  productSize: "",
}

loadProducts() {
  this.getProducts().subscribe((data) =>
  {
    this.products = data;
  });
}
addViewedProducts(products: Product) {

  this.detailedProduct = products;
}
addOrderedProducts(products: Product[]) {

  this.products = products;
}
getProducts() : Observable<Product[]> {
  return this.http.get<Product[]>(this.getUrl).pipe(
    map((data: Product[]) => {
      return data;
    }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
}

addProduct(product: Product) {
  return this.http.post<Product>(this.getUrl, product).pipe(
    catchError(error => {
       return throwError(error);
    }));
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(this.getUrl, product).pipe(
      catchError(error => {
         return throwError(error);
      }));
    }
  deleteProduct(productId: number) {
    return this.http.delete(this.getUrl + "/" + productId).pipe(
      catchError(error => {
        return throwError(error);}
        ));
  }
}
