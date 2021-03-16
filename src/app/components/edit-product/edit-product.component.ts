import {Product  } from '../../interfaces/Product';
import { Category  } from '../../interfaces/Category';
import { Size  } from '../../interfaces/Size';
import { Component, OnInit } from '@angular/core';
import {ProductService } from '../../services/products/product.service';
import {CategoriesService } from '../../services/categories/categories.service';
import {SizesService } from '../../services/sizes/sizes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService,private categoryService: CategoriesService,private sizeService: SizesService, private formBuilder: FormBuilder) { }
  EditProductForm: FormGroup;
  today: Date;
  products: Product[] = [];
  categories: Category[] = [];
  sizes: Size[] = [];
  checkError: string;
  product: Product;
  submitted = false;
  ngOnInit() {
    this.getSize();
    this.getCategory();
    this.product = this.productService.detailedProduct;
    this.today = this.product.createDate

    this.EditProductForm = new FormGroup({
      createDate: new FormControl(this.product.createDate),
      productName: new FormControl(this.product.productName, Validators.required),
      productId: new FormControl(this.product.productId),
      categoryId: new FormControl(this.product.categoryId),
      categoryName: new FormControl(this.product.categoryName, Validators.required),
      availableQuantity: new FormControl(this.product.availableQuantity, Validators.required),
      price: new FormControl(this.product.price, Validators.required),
      description: new FormControl(this.product.description),
      productSizeId: new FormControl(this.product.productSizeId),
      productSize: new FormControl(this.product.productSize, Validators.required)
      })

    /*this.productService.getProducts().subscribe((data) =>{
      data.forEach((product) => {
        this.route.paramMap.subscribe((param) =>{
      if(Number(param.get('id')) === product.productId) {
    this.EditProductForm = this.formBuilder.group({
      createDate: product.createDate,
      productName: product.productName,
      productId: product.productId,
      categoryId: product.categoryId,
      categoryName: product.categoryName,
      availableQuantity: product.availableQuantity,
      price: product.price,
      description: product.description,
      productSizeId: product.productSizeId,
      productSize: product.productSize
      })
    }})
  });});*/

    /*var n =  new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y;*/
  }


  get productName() { return this.EditProductForm.get('productName')}
  get categoryName() { return this.EditProductForm.get('categoryName')}
  get availableQuantity() { return this.EditProductForm.get('availableQuantity')}
  get price() { return this.EditProductForm.get('price')}
  get description() { return this.EditProductForm.get('description')}
  get productSize() { return this.EditProductForm.get('productSize')}
  get createDate() { return this.EditProductForm.get('createDate')}


  updateProduct(product: Product): void {

    this.submitted = true;

    if (product.productName === '') {
      throw this.checkError = 'Wrong name'
    }

    if (!isNaN(Number(product.price)) && product.price > 0) {
      product.price = Number(product.price);
    } else {
      throw this.checkError = 'Wrong input price'
    }

    if (!isNaN(Number(product.availableQuantity)) && product.availableQuantity > 0) {
      product.availableQuantity = Number(product.availableQuantity);
    } else {
      throw this.checkError = 'Wrong quantity'
    }


    this.categories.forEach(element => {
      if(element.categoryName === product.categoryName)
      product.categoryId = element.categoryId;
    });

    if(product.categoryId === 0) {
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
    this.productService.updateProduct(product).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['products']);
    }, error => console.log(error));

  }

  reset() {
    //this.productService.products = null;
    this.router.navigate(['view-product/'+ String(this.product.productId)])
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
