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
  selector: 'app-product-to-edit-order',
  templateUrl: './product-to-edit-order.component.html',
  styleUrls: ['./product-to-edit-order.component.css']
})
export class ProductToEditOrderComponent implements OnInit {

  constructor(private router: Router, private OrderProductService: OrderProductService,private orderService: OrderService,private productService: ProductService, private sizesServices: SizesService, private formBuilder: FormBuilder) { }
  submitted = false;
  products: Product[] = [];
  categories: Category[] = [];
  statuses: Status[] = [];
  sizes: Size[] = [];
  customers: Customer[] = [];
  checkError: string;
  EditProductToOrderForm = this.formBuilder.group({
    productName: new FormControl('', Validators.required),
   orderDate: new FormControl((new Date()).toLocaleDateString),
    productId: new FormControl(0),
    categoryId: new FormControl(0),
    categoryName: new FormControl('', Validators.required),
    quantity: new FormControl(0, Validators.required),
    productSizeId: new FormControl(0),
    productSize: new FormControl('', Validators.required)
    });


    get productName() { return this.EditProductToOrderForm.get('productName')}
    get categoryName() { return this.EditProductToOrderForm.get('categoryName')}
    get quantity() { return this.EditProductToOrderForm.get('quantity')}
    get productSize() { return this.EditProductToOrderForm.get('productSize')}

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
    this.submitted = true;
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
      if (element.productName === producFormOrder.productName) {
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
    if(this.orderService.hasProduct(productOrder.productId)) {

    }
    this.orderService.addProductToOrder(productOrder)
    this.router.navigate(['update-order/']);

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
