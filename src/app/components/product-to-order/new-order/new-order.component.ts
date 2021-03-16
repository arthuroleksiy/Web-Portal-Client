import { Router } from '@angular/router';
import { Customer } from './../../interfaces/Customer';
import { OrderService } from './../../services/orders/orders.service';
import { OrderProductService } from './../../services/orderProduct/orderProduct.service';
import { Component, OnInit } from '@angular/core';
import { Order } from './../../interfaces/Order';
import { CustomerService } from './../../services/customers/customers.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ProductOrder} from './../../interfaces/ProductOrder';
import { Status  } from '../../interfaces/Status';
import {StatusesService } from '../../services/statuses/statuses.service';
import { Store } from '@ngrx/store';
import {  AppState } from "../../ngrx/app.state";
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/products/product.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  today: number = Date.now();
  observeOrder: Observable<Order>;
  order: Order;
  customers: Customer[] = [];
  statuses: Status[] =[];
  totalCost: number = 0;
  productOrders: ProductOrder[] = [];
  deletedProducts: ProductOrder[] = [];
  products: Product[] = [];
  checkError: string;
  registerError: string;
  constructor(private dialog: MatDialog, private router: Router, private customerService: CustomerService, private productService: ProductService , private statusesService: StatusesService, private orderService: OrderService,  private orderProductService: OrderProductService, private formBuilder: FormBuilder) {


  }
/*
    AddNewOrderForm= new FormGroup({
      orderDate: new FormControl(''),
      orderId: new FormControl(''),
      customerId: new FormControl(''),
      customer: new FormControl(''),
      products: new FormControl(''),
      status: new FormControl(''),
      totalOrderCost: new FormControl(''),
      comment: new FormControl('')
      });*/

  AddNewOrderForm= this.formBuilder.group({
    orderDate: new Date().getTime().toLocaleString,
    orderId: 0,
    customerId: 0,
    customerName: "",
    products: [],
    statusId: 0,
    statusName: "",
    totalOrderCost: 0,
    comment: ""
    });
    /*addOrderToStore(order: Order) {
      this.customers.forEach(element => {
      if(element.customerName === order.customer)
        order.customerId = element.customerId
    });

    this.statuses.forEach(element => {
      if(element.statusName === order.status)
      order.statusId = element.statusId
    });
    order.products = this.productOrders;
      this.store.dispatch({
        type: 'ADD_PRODUCT',
        payload: <Order> {
          orderDate: order.orderDate,
          orderId: order.orderId,
          customerId: order.customerId,
          customer: order.customer,
          products: order.products,
          statusId: order.statusId,
          status: order.status,
          totalOrderCost: order.totalOrderCost,
          comment: order.comment
        }
      });
    }*/
  ngOnInit() {
    this.today = Date.now();
    this.getCustomers();
    this.getStatuses();
    this.getProducts();
    this.totalCost = 0;
    this.productOrders = this.orderProductService.get();
    this.order = this.orderProductService.getOrder();
    this.setTotalCost()
    if(this.order.comment)
    this.AddNewOrderForm.controls["comment"].setValue(this.order.comment);
    if(this.order.customerName)
    this.AddNewOrderForm.controls["customerName"].setValue(this.order.customerName);
    if(this.order.statusName)
    this.AddNewOrderForm.controls["statusName"].setValue(this.order.statusName);
    if(this.order.orderDate)
    this.AddNewOrderForm.controls["orderDate"].setValue(this.order.orderDate);
    if(this.order.totalOrderCost)
    this.AddNewOrderForm.controls["totalOrderCost"].setValue(this.totalCost);
  }

addCurrentState()
{
  this.orderProductService.addOrder(this.AddNewOrderForm.value);
  this.router.navigateByUrl("/productToOrder");
}
reset()
{
  this.orderProductService.DeleteOrder()
  this.deletedProducts.forEach((productOrder)=> {
    this.productOrders.push(productOrder)
  });
  this.router.navigate(['orders']);
}

  addOrder(order: Order): void {


    this.customers.forEach(element => {
    if(element.customerName === order.customerName)
      order.customerId = element.customerId
  });

  if(order.customerId === 0)
  throw this.checkError = 'Empty customer'

  this.statuses.forEach(element => {
    if(element.statusName === order.statusName)
    order.statusId = element.statusId
  });

  if(order.statusId === 0)
    throw this.checkError = 'Empty status'

  order.products = this.productOrders;

  this.setTotalCost()
  this.productOrders.forEach((productOrder) => {
    this.products.forEach((product) => {
      if(productOrder.productId === product.productId)
      {
        if(product.availableQuantity < productOrder.quantity) {
          throw this.checkError = "There is too much" + product.productName
        }
      }
    });
  });
  this.orderService.addOrder(order).subscribe((data: any) => {
      this.orderProductService.DeleteOrder()
      console.log(data);

      this.router.navigate(['orders']);
  }, error => console.log(error));

  }
  getCustomers(): void {
    this.customerService.getCustomers().subscribe((data) =>
    {
      this.customers = data;
      console.log(data);
    });
  }
  getStatuses(): void {
    this.statusesService.getStatuses().subscribe((data) =>
    {
      this.statuses = data;
      console.log(data);
    });
  }
  getProducts(): void {
    this.productService.getProducts().subscribe((data) =>
    {
      this.products = data;
    });
  }
  setTotalCost()
  {
    this.totalCost = 0;
    this.productOrders.forEach((element) =>
    this.totalCost += element.quantity * element.product.price
    );
  }

  openDialog(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Are you sure you want to delete this data?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.deleteProduct(productId);
     }});
  }

  deleteProduct(productId: number) {
    for(var i = 0; i <this.productOrders.length; i++) {
      if(productId === this.productOrders[i].productId) {
        this.deletedProducts.push(this.productOrders[i])
        this.productOrders.splice(i,1)
      }
    }

  }
}
