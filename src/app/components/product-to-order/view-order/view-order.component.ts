import { OrderService } from './../../services/orders/orders.service';
import { Order } from './../../interfaces/Order';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from '../../services/products/product.service';
import { switchMap } from 'rxjs/operators';
import { ProductOrder } from 'src/app/interfaces/ProductOrder';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  order: Order;
  productOrder: ProductOrder[];
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private orderService: OrderService, private formBuilder: FormBuilder){
  }
  SeeOrderForm = this.formBuilder.group({
    orderId: new FormControl(""),
    customerId:new FormControl(""),
    customerName: new FormControl(""),
    products: new FormControl(""),
    statusId: new FormControl(""),
    statusName: new FormControl(""),
    totalOrderCost: new FormControl(""),
    orderDate: new FormControl(""),
    comment:new FormControl("")
    });
  ngOnInit() {
    this.order = this.orderService.detailedOrder
    this.productOrder = this.order.products
    /*
    this.orderService.getOrders().subscribe((data) => {
      data.forEach((order)  =>
      {
        this.route.paramMap.subscribe(params =>
          {
            if(Number(params.get('id')) === order.orderId)
            {
              this.order = order
              this.productOrder = order.products
            }
          })
      })
    })*/
  }

  getOrder(id?: number): Order {
    if(id != undefined) {
    this.orderService.getOrders().subscribe((data) =>
    {
      data.forEach((ord) => {
        if(ord.orderId == id) {
          this.order = ord;
        }
      })
      console.log(data);
    });
  }

  return this.order;
  }
  deleteProduct(productId: number) {
    for(var i = 0; i <this.productOrder.length; i++) {
      if(productId)
      this.productOrder.splice(i,1)
    }

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

}
