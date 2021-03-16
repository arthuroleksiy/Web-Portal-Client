import { FormBuilder, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {Product  } from '../../interfaces/Product';
import { Category  } from '../../interfaces/Category';
import { Size  } from '../../interfaces/Size';
import { Component, OnInit } from '@angular/core';
import {ProductService } from '../../services/products/product.service';
import {CategoriesService } from '../../services/categories/categories.service';
import {SizesService } from '../../services/sizes/sizes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
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

  ngOnInit() {
    this.getSize();
    this.getCategory();
    this.product = this.productService.detailedProduct;
    this.today = this.product.createDate

    this.EditProductForm = this.formBuilder.group({
      createDate: this.product.createDate,
      productName: this.product.productName,
      productId: this.product.productId,
      categoryId: this.product.categoryId,
      categoryName: this.product.categoryName,
      availableQuantity: this.product.availableQuantity,
      price: this.product.price,
      description: this.product.description,
      productSizeId: this.product.productSizeId,
      productSize: this.product.productSize
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
  updateProduct(product: Product): void {
    if(!isNaN(Number(product.price)))
      product.price = Number(product.price);

    if(!isNaN(Number(product.availableQuantity)))
      product.availableQuantity = Number(product.availableQuantity);

    this.categories.forEach(element => {
      if(element.categoryName === product.categoryName)
      product.categoryId = element.categoryId;
    });

    this.sizes.forEach(element => {
      if(element.size === product.productSize)
      product.productSizeId = element.productSizeId;
    });

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
