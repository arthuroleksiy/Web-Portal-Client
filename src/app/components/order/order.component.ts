import { OutputOrder } from './../../interfaces/OutputOrder';
import { Customer } from './../../interfaces/Customer';
import { CustomerService } from './../../services/customers/customers.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Order } from '../../interfaces/Order';

import { Router } from '@angular/router';
import { Product } from '../../interfaces/Product';
import {OrderService } from '../../services/orders/orders.service';
import { Observable, merge, fromEvent, interval, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  constructor(private router: Router, private orderService: OrderService, private customerService: CustomerService, private formBuilder: FormBuilder) { }

  orders: Order[] = [];
  outputOrders: Observable<OutputOrder[]>;
  //outputOrders: OutputOrder[]
  customers: Customer[] = [];
  AddOrderForm = this.formBuilder.group({
    orderId: 0,
    customerId: 0,
    customerName: "",
    products: [],
    statusId: 0,
    status: "",
    orderDate: Date,
    comment: "",

  });

  ngOnInit(): void {
    //['/product', order.orderId]
    /*this.orderService.getOrders().subscribe((data) =>
    {
      this.orders = data;
      console.log(data);
    });*/

    //this.getCustomers();
    this.getOrder();
  }


 getOrder(): void {
/*
    this.orderService.getOrders().pipe(mergeMap((i: Order[]) => {
      return this.customerService.getCustomers().pipe(map((j: Customer[]) =>
        this.orderService.getOrdersWithAddress(j, i)
      ))
    })).subscribe(result => this.outputOrders = result);*/

    this.outputOrders = this.orderService.getOrders().pipe(mergeMap(res1 =>
      this.customerService.getCustomers().pipe(map(res2 => {
        return this.orderService.getOrdersWithAddress(res2, res1);
      }))
    ));

    this.outputOrders.subscribe((data) => {
        this.orders = data;
    });
  /*this.customerService.getCustomers().subscribe((customer) =>
  {

     this.outputOrders = this.orderService.getOrders().pipe(
       map(((data: Order[]) =>
        this.orderService.getOrdersWithAddress(customer, data)
      )))

  this.outputOrders.subscribe((data) => {
    this.orders = data;
  })
  })*/


    /*this.orderService.getOrders().subscribe((data) =>
    {
      this.orders = data;
      this.outputOrders = data;
      this.outputOrders = this.orderService.getOrdersWithAddress(this.customers, this.outputOrders)
      console.log(data);
    });*/
  }


  getCustomers(): void {
    this.customerService.getCustomers().subscribe((data) =>
    {
      this.customers = data;
      console.log(data);
    });
  }

  addOrder(order: Order): void {
    this.orderService.addOrder(order).subscribe((data: any) => {
      console.log(data);
      this.orderService.getOrders().subscribe((data) =>
      {
        this.orders = data;
        console.log(data);
      });
    }, error => console.log(error));
  }

  toViewOrder(id: number)
  {
    this.orders.forEach((data) => {
      if(data.orderId === Number(id))
        this.orderService.addViewOrder(data)
      });

      this.router.navigate(["/orders/", id]);
  }
}







