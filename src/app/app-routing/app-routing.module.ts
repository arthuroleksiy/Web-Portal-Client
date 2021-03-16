import { ProductToEditOrderComponent } from './../components/product-to-edit-order/product-to-edit-order.component';
import { ViewOrderComponent } from './../components/view-order/view-order.component';
import { ProductToOrderComponent } from './../components/product-to-order/product-to-order.component';
import { Product } from './../interfaces/Product';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from '../components/customer/customer.component';
import { OrderComponent} from '../components/order/order.component';
import { ProductComponent} from '../components/product/product.component';
import { NewCustomerComponent} from '../components/new-customer/new-customer.component';
import { NewProductComponent} from '../components/new-product/new-product.component';
import { NewOrderComponent} from '../components/new-order/new-order.component';
import { from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser'
import { ViewProductComponent } from '../components/view-product/view-product.component';
import { EditOrderComponent } from '../components/edit-order/edit-order.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'products', component: ProductComponent },
  { path: 'newCustomer', component: NewCustomerComponent },
  { path: 'newProduct', component: NewProductComponent },
  { path: 'newOrder', component: NewOrderComponent },
  { path: 'productToOrder', component: ProductToOrderComponent },
  { path: 'view-order/:id', component: ViewOrderComponent},
  { path: 'view-order', component: ViewOrderComponent},
  { path: 'view-product/:id',component: ViewProductComponent},
  { path: 'update-order', component: EditOrderComponent},
  { path: 'update-product',component: EditProductComponent},
  { path: 'product-to-order',component: ProductToEditOrderComponent},
  { path: '', redirectTo: 'orders', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
