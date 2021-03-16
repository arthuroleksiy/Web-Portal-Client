
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import {Product  } from '../../interfaces/Product';
import { Category  } from '../../interfaces/Category';
import { Size  } from '../../interfaces/Size';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import {ProductService } from '../../services/products/product.service';
import {CategoriesService } from '../../services/categories/categories.service';
import {SizesService } from '../../services/sizes/sizes.service';
import { Customer } from '../../interfaces/Customer';
import {CustomerService } from '../../services/customers/customers.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit, AfterContentInit {

  constructor(private router: Router, private productService: ProductService,private categoryService: CategoriesService,private sizeService: SizesService) { }
  submitted = false;
  today = Date.now().toLocaleString;
  products: Product[] = [];
  categories: Category[] = [];
  sizes: Size[] = [];
  checkError: string;
  AddNewProductForm: FormGroup;


    get productName() { return this.AddNewProductForm.get('productName')}
    get categoryName() { return this.AddNewProductForm.get('categoryName')}
    get availableQuantity() { return this.AddNewProductForm.get('availableQuantity')}
    get price() { return this.AddNewProductForm.get('price')}
    get description() { return this.AddNewProductForm.get('description')}
    get productSize() { return this.AddNewProductForm.get('productSize')}
    get createDate() { return this.AddNewProductForm.get('createDate')}
  /*AddNewProductForm = this.formBuilder.group({
    createDate: new Date().getTime().toLocaleString,
    productName: "",
    productId: 0,
    categoryId: 0,
    categoryName: "",
    availableQuantity: 0,
    price: 0,
    description: "",
    productSizeId: 0,
    productSize: ""
    });*/
    /*
    AddCustomerForm = new FormGroup({
      creationDate: new FormControl(this.today, ),
      customerName: new FormControl('',Validators.required),
      customerAddress: new FormControl('',Validators.required),
      customerId: new FormControl('' )});
      */
  ngOnInit() {
    this.getSize();
    this.getCategory();

    //this.AddNewProductForm.controls["description"].setValue(this.today)
    /*var n =  new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y;*/
  }

  ngAfterContentInit() {
    this.AddNewProductForm = new FormGroup({
      createDate: new FormControl(this.today),
      productName: new FormControl('', Validators.required),
      productId: new FormControl(0),
      categoryId: new FormControl(''),
      categoryName: new FormControl(this.categories[0], Validators.required),
      availableQuantity: new FormControl(0 , Validators.required),
      price: new FormControl(0 , Validators.required),
      description: new FormControl(''),
      productSizeId: new FormControl(''),
      productSize: new FormControl('', Validators.required)
      });

  }
  addProduct(product: Product): void
  {

    this.submitted = true;
    if(product.productName === '') {
      throw this.checkError = 'Wrong name'
    }

    if(!isNaN(Number(product.price)) && product.price > 0) {
      product.price = Number(product.price);
    } else {
      throw this.checkError = 'Wrong input price'
    }

    if(!isNaN(Number(product.availableQuantity)) && product.availableQuantity > 0) {
      product.availableQuantity = Number(product.availableQuantity);
    } else {
      throw this.checkError = 'Wrong quantity'
    }


    this.categories.forEach(element => {
      if(element.categoryName === product.categoryName)
      product.categoryId = element.categoryId;
    });
    if(product.categoryId === 0){

      throw this.checkError = 'Wrong category'
    }
    this.sizes.forEach(element => {
      if(element.size === product.productSize)
      product.productSizeId = element.productSizeId;
    });
    if(product.productSizeId === 0) {

      throw this.checkError = 'Wrong product size'
    }

    console.log(product);
    this.productService.addProduct(product).subscribe((data: any) => {
      console.log(data);

      this.router.navigate(['products']);
    }, error => {throw error});

  }

  reset() {
    this.productService.products = null;
    this.router.navigate(['/products'])
  }
  getSize(): void {
    this.sizeService.getSizes().subscribe((data) =>
    {
      this.sizes = data;
      console.log(data);
    });
  }

  getCategory(): void {
    this.categoryService.getCategories().subscribe((data) =>
    {
      this.categories = data;
      console.log(data);
    });
  }
}
