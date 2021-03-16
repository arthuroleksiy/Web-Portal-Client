import { ProductOrder } from '../../interfaces/ProductOrder';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../products/product.service';

import { OrderProductService } from '../orderProduct/orderProduct.service';
import { AbstractControl, ValidationErrors, ValidatorFn, Validator, NG_VALIDATORS, FormControl } from '@angular/forms'

import { Directive, OnInit, forwardRef, Input, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class QuantityValidatorService {


constructor( private orderProductService: OrderProductService, private productService: ProductService) { }
products: Product[] = [];

/*
readonly quantityValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let permanentQuantity: number;
  let productName= control.get('productName'); //formGroup.value as ProductFormOrder;
  let quantity = control.get('quantity');
  if (quantity && productName) {
    let count = 0;

    let orderProduct = OrderProductService.get();
    orderProduct.sort();
    orderProduct.forEach((ordeProd) => {
      if(productName.value === ordeProd.product.productName)
      count += quantity.value
    })
    this.products.forEach((product) => {
      if(product.productName === productName.value && product.availableQuantity >= count)
      { identityRevealed: true }

    });
  }
  return null;
}*/
  quantityValidator(control: AbstractControl): {[key: string]: any} | null  {
  let permanentQuantity: number;
  this.getProducts();
  let productName= control.get('productName'); //formGroup.value as ProductFormOrder;
  let quantity = control.get('quantity');
  if (quantity && productName) {
    let count = 0;

    let orderProduct = this.orderProductService.get();
    orderProduct.sort();
    orderProduct.forEach((ordeProd) => {
      if(productName.value === ordeProd.product.productName)
      count += quantity.value
    })
    this.products.forEach((product) => {
      if(product.productName === productName.value && product.availableQuantity >= count)
      return { 'WrongQuantity': {value: control.value} };
    });
  }
  return null
}
getProducts() {
this.productService.getProducts().subscribe((data) =>
    {
      this.products = data;
      console.log(data);
    });
  }
}
