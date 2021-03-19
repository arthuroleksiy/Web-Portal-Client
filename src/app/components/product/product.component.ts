import { WarningDialogComponent } from './../warning-dialog/warning-dialog.component';
import { OrderService } from 'src/app/services/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { Product } from '../../interfaces/Product';
import {ProductService } from '../../services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {
  title = 'angular-confirmation-dialog';

  constructor(private dialog: MatDialog, private orderService: OrderService, private route: ActivatedRoute, private router: Router, private productService: ProductService, private formBuilder: FormBuilder) { }

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

  warningDialog(productId: number): void {
    const dialog = this.dialog.open(WarningDialogComponent, {
      width: '350px',
      data: "You can't delete this product. Some orders contain this product"
    });

    dialog.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
     }});
  }
  products: Product[] = [];
  deleteBool: boolean;
  ngOnInit(): void {
    this.getProduct();
  }
  toViewProduct(id: string)
  {
    this.products.forEach((data) => {
      if(data.productId == Number(id))
        this.productService.addViewedProducts(data);
      });

      this.router.navigate(["/products/", id]);
  }

  getProduct(): void {
    this.productService.getProducts().subscribe((data) =>
    {
      this.products = data;
      this.productService.addOrderedProducts(data);
      console.log(data);
    });
  }
  addProduct(product: Product): void {

    this.productService.addProduct(product).subscribe((data: any) => {
      console.log(data)

      this.productService.getProducts().subscribe((data) =>
      {
        this.products = data;
        console.log(data);
      });
    }, error => console.log(error));
  }
  setBool() {
    this.deleteBool = true;
  }


  deleteProduct(productId: number) {
    if(this.orderService.hasProduct(productId)) {
      this.warningDialog(productId)
    }
    else
    {
      this.productService.deleteProduct(productId).subscribe((data) => {
        this.productService.loadProducts()
        this.getProduct()
  });
  }
}
}
