import { QuantityValidatorService } from './../../services/validation/quantityValidator.service';
import { ProductFormOrder } from './../../interfaces/ProductFormOrder';
import { OrderProductService } from './../../services/orderProduct/orderProduct.service';
import { ProductOrder } from './../../interfaces/ProductOrder';

import { Customer } from './../../interfaces/Customer';
import { CustomerService } from './../../services/customers/customers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import {Product  } from '../../interfaces/Product';
import { Category  } from '../../interfaces/Category';
import { Size  } from '../../interfaces/Size';
import { Status  } from '../../interfaces/Status';
import {ProductService } from '../../services/products/product.service';
import {OrderService } from '../../services/orders/orders.service';
import {StatusesService } from '../../services/statuses/statuses.service';
import {SizesService } from '../../services/sizes/sizes.service';
import { CategoriesService } from './../../services/categories/categories.service';
import { Router } from '@angular/router';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-product-to-order',
  templateUrl: './product-to-order.component.html',
  styleUrls: ['./product-to-order.component.css']
})
export class ProductToOrderComponent implements OnInit {

  constructor(private quantityValidatorService: QuantityValidatorService, private router: Router, private OrderProductService: OrderProductService,private productService: ProductService, private sizesServices: SizesService, private formBuilder: FormBuilder) { }

  products: Product[] = [];
  categories: Category[] = [];
  statuses: Status[] = [];
  sizes: Size[] = [];
  customers: Customer[] = [];
  checkError: string;
  AddProductToOrderForm = this.formBuilder.group({
    productName: new FormControl("", [
      Validators.required
   ]),
   orderDate: new FormControl(""),
    productId: new FormControl(""),
    categoryId: new FormControl(""),
    categoryName: new FormControl(""),
    quantity: new FormControl("", [
      Validators.min(1),
      Validators.required,
      //this.quantityValidator
   ]),
    productSizeId: new FormControl(0),
    productSize: new FormControl(0, [
      Validators.required
   ])
    });


  ngOnInit() {
    this.getProducts();
    this.getSizes();

    /*var n =  new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y;*/
  }
  addProductOrder(producFormOrder: ProductFormOrder): void {
    let productOrder: ProductOrder = ({ quantity: 0, productId: 0, product: ({} as Product) } as ProductOrder);
    if(!isNaN(Number(producFormOrder.quantity)) && String(producFormOrder.quantity) != '')
    {
      productOrder.quantity = Number(producFormOrder.quantity);
    }
    else
    {
      throw this.checkError = "There are no product quantity"
    }
    this.products.forEach(element => {
      if(element.productName === producFormOrder.productName) {
      productOrder.productId = element.productId
      productOrder.product.productId = element.productId
      productOrder.product.productName = element.productName
      productOrder.product.productSize = element.productSize
      productOrder.product.productSizeId = element.productSizeId
      productOrder.product.price = element.price
      productOrder.product.description = element.description
      productOrder.product.createDate = element.createDate
      productOrder.product.categoryName = element.categoryName
      productOrder.product.categoryId = element.categoryId
      productOrder.product.availableQuantity = element.availableQuantity
      }
    });
    //console.log(product);

    if(productOrder.product.productName === undefined || productOrder.product.productName === undefined) {
      throw this.checkError = "Wrong product name or category"
    }
    this.OrderProductService.add(productOrder);
    this.router.navigate(['newOrder']);

  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data) =>
    {
      this.products = data;
      console.log(data);
    });
  }
  getSizes(): void {
    this.sizesServices.getSizes().subscribe((data) =>
    {
      this.sizes = data;
      console.log(data);
    });
  }
}
