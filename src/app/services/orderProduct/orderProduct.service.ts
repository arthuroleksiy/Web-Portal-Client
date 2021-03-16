import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Product} from '../../interfaces/Product';
import {Order} from '../../interfaces/Order';
import {ProductOrder} from '../../interfaces/ProductOrder';
@Injectable({
  providedIn: 'root'
})
export class OrderProductService {
productOrders: ProductOrder[] = [];
order = {orderId: 0,
  customerId: 0,
  customerName: "",
  products: [],
  statusId: 0,
  statusName: "",
  totalOrderCost: 0,
  orderDate: new Date(),
  comment: ""};
constructor() { }

add(productOrder: ProductOrder) {
  this.productOrders.push(productOrder);
}
addOrder(order: Order) {
  this.order = order
}


addOrderValues(orderId: number,
  customerId: number,
  customerName: string,
  products: Array<ProductOrder>,
  statusId: number,
  statusName: string,
  totalOrderCost: number,
  orderDate: Date,
  comment: string) {
  this.order = { orderId: orderId,customerId: customerId, customerName: customerName,products: products,statusId: statusId,statusName: statusName,totalOrderCost: totalOrderCost,orderDate: orderDate, comment:comment };
}
addProductAndQuantity(product: Product, quantity: number, productId: number) {
  this.productOrders.push({product, quantity, productId});
}
DeleteOrder() {
  this.productOrders = [];
  this.order = null
}

get(): ProductOrder[] {
  return this.productOrders;
}
getOrder(): Order {
  return this.order;
}
}
