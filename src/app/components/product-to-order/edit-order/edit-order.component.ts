import { OrderProductService } from './../../services/orderProduct/orderProduct.service';
import { Order } from './../../interfaces/Order';
import { Customer } from './../../interfaces/Customer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';
import { Product } from 'src/app/interfaces/Product';
import { Size } from 'src/app/interfaces/Size';
import { Status } from 'src/app/interfaces/Status';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { CustomerService } from 'src/app/services/customers/customers.service';
import { ProductService } from 'src/app/services/products/product.service';
import { StatusesService } from 'src/app/services/statuses/statuses.service';
import { OrderService } from 'src/app/services/orders/orders.service';
import { ProductOrder } from 'src/app/interfaces/ProductOrder';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  constructor(private dialog: MatDialog,private router: Router, private orderProductService: OrderProductService, private orderService: OrderService, private route: ActivatedRoute, private productService: ProductService,private customerService: CustomerService,private statusesService: StatusesService, private formBuilder: FormBuilder) { }
  EditOrderForm: FormGroup;
  today: number = Date.now();
  products: Product[] = [];
  customer: Customer[] = [];
  statuses: Status[] = [];
  checkError: string;
  product: Product;
  order: Order;
  productOrder: ProductOrder[];
  deletedProducts: ProductOrder[] = [];

  ngOnInit() {
    this.today = Date.now();
    this.getCustomer();
    this.getStatus();
    this.order = this.orderService.detailedOrder
    this.productOrder = this.order.products
    //this.products = this.order.products;

    this.EditOrderForm = this.formBuilder.group({
      orderId: this.order.orderId,
      customerId: this.order.customerId,
      customerName: this.order.customerName,
      products: this.order.products,
      statusId: this.order.statusId,
      statusName: this.order.statusName,
      totalOrderCost: this.order.totalOrderCost,
      orderDate: this.order.orderDate,
      comment: this.order.comment
      })

      if(this.order.comment)
      this.EditOrderForm.controls["comment"].setValue(this.order.comment);
      if(this.order.customerName)
      this.EditOrderForm.controls["customerName"].setValue(this.order.customerName);
      if(this.order.statusName)
      this.EditOrderForm.controls["status"].setValue(this.order.statusName);
      if(this.order.orderDate)
      this.EditOrderForm.controls["orderDate"].setValue(this.order.orderDate);

  }



  updateOrder(order: Order): void {
    if(order.customerName ==='' || order.statusName ==='') {
      throw this.checkError = "Wrong product name or category";
    }

    this.statuses.forEach(element => {
    if(element.statusName === order.statusName)
      order.statusId = element.statusId
  });


  this.customer.forEach(element => {
    if(element.customerName === order.customerName)
    order.customerId = element.customerId
  });
  order.products=this.productOrder
  this.orderService.updateOrder(order).subscribe((data: any) => {
      console.log(data);

      this.router.navigate(['view-order/'+ String(this.product.productId)]);
  }, error => console.log(error));

  }

  addCurrentState()
  {
    this.orderProductService.addOrder(this.EditOrderForm.value);

    this.orderService.addViewOrder(this.EditOrderForm.value)
    this.router.navigateByUrl("/product-to-order");
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

  reset() {
    this.deletedProducts.forEach((product) => {
      this.orderService.addProductToOrder(product)
    });
    this.orderProductService.DeleteOrder()
    this.router.navigateByUrl("/view-order")
  }
  getCustomer(): void {
    this.customerService.getCustomers().subscribe((data) =>
    {
      this.customer = data;
      console.log(data);
    });
  }

  getStatus(): void {
    this.statusesService.getStatuses().subscribe((data) =>
    {
      this.statuses = data;
      console.log(data);
    });
  }
  /*
  deleteProduct(productId: number) {
    for(var i = 0; i <this.productOrders.length; i++) {
      if(productId === this.productOrders[i].productId) {
        this.deletedProducts.push(this.productOrders[i])
        this.productOrders.splice(i,1)
      }
    }

  }*/
  deleteProduct(productId: number)
  {
    let bufferProducts = this.orderService.detailedOrder.products
    for(var i = 0; i < bufferProducts.length; i++) {

      if(bufferProducts[i].productId == productId) {
        this.deletedProducts.push(bufferProducts[i])
        bufferProducts.splice(i,1)
      }
    }

    this.orderService.detailedOrder.products = bufferProducts
    //this.productOrder = this.orderService.detailedOrder.products
    this.router.navigate(['view-order/'+ String(this.orderService.order.orderId)])
  }
}

