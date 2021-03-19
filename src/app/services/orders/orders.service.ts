import { Product } from './../../interfaces/Product';
import { HttpClient } from '@angular/common/http';
import { Order } from './../../interfaces/Order';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { ProductOrder } from 'src/app/interfaces/ProductOrder';
import { Customer } from 'src/app/interfaces/Customer';
import { OutputOrder } from 'src/app/interfaces/OutputOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

getUrl = "https://localhost:44313/api/Order";

constructor(private http: HttpClient) { }
orders: Order[] = [];
order: Order
detailedOrder: Order = {
  orderId: 0,
  customerId: 0,
  customerName: "",
  products: [],
  statusId: 0,
  statusName: "",
  totalOrderCost: 0,
  orderDate: new Date(),
  comment: ""
}
addViewOrder(order: Order) {
  this.detailedOrder = order
}
addProductToOrder(product: ProductOrder) {
  this.detailedOrder.products.push(product)
}

getOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(this.getUrl).pipe(
    map((data: Order[]) => {
      this.orders = data;
      return data;
    }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
}
getOrderById(id: number): Observable<Order> {
  return this.http.get<Order>(this.getUrl + '/' + id).pipe(
    map((data) => {
      this.order = data;
      return data;
    }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
}
updateOrder(order: Order) {
  return this.http.put<Order>(this.getUrl, order).pipe(
    catchError(error => {
       return throwError(error);
    }));
}

addOrder(order: Order) {
  return this.http.post<Order>(this.getUrl, order).pipe(
    catchError(error => {
       return throwError(error);
    }));
  }

  getOrdersWithAddress(customers: Customer[], outputOrders: OutputOrder[]): OutputOrder[]  {
  outputOrders.forEach((outputOrder) => {
    customers.forEach((customer) => {
      if(outputOrder.customerId === customer.customerId) {
        outputOrder.customerAddress = customer.customerAddress;
      }
    })
  })
  return outputOrders
}

hasProduct(productId: number): boolean {
  var deleteProduct = false;
  this.orders.forEach((order) => {
    var products = order.products;

    products.forEach((product) =>
      {
      if(product.productId == productId) {
        deleteProduct =  true;
      }
    });
  });
  return deleteProduct;
}
}
