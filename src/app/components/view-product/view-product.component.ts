import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from '../../services/products/product.service';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product: Product;
  constructor(private productService:ProductService, private route: ActivatedRoute, private formBuilder:FormBuilder, private router: Router) { }

  SeeProductForm = this.formBuilder.group({
    productName: new FormControl(""),
    orderDate: new FormControl(""),
    productId: new FormControl(""),
    categoryId: new FormControl(""),
    category: new FormControl(""),
    quantity: new FormControl(""),
    productSizeId: new FormControl(""),
    productSize: new FormControl("")
    });

    editProduct()
     {

      //this.route.paramMap.subscribe(params =>
      this.router.navigate(["update-product"])
      //);

    }
  ngOnInit() {
    this.product = this.productService.detailedProduct
    /*this.productService.getProducts().subscribe((data) => {
      data.forEach((product)  => {
        this.route.paramMap.subscribe(params =>
          {
            if(Number(params.get('id')) === product.productId)
            {
              this.product = {
                productId: product.productId,
                 price:product.price,
                 productName:product.productName,
                 productSize: product.productSize,
                 categoryName: product.categoryName,
                 availableQuantity: product.availableQuantity,
                 description: product.description,
                 createDate: product.createDate,
                 productSizeId: product.productSizeId,
                 categoryId: product.categoryId
          };
        }
      })
    })
  })*/
}
}
