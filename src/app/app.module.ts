import { ProductToEditOrderComponent } from './components/product-to-edit-order/product-to-edit-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { ProductToOrderComponent } from './components/product-to-order/product-to-order.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { addOrderReducer } from './ngrx/order.reducer';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { StoreModule } from '@ngrx/store';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    OrderComponent,
    CustomerComponent,
    NewCustomerComponent,
    NewProductComponent,
    NumbersOnlyDirective,
    ProductToOrderComponent,
    NewOrderComponent,
    ViewOrderComponent,
    ViewProductComponent,
    EditProductComponent,
    EditOrderComponent,
    ProductToEditOrderComponent,
    ConfirmationDialogComponent,
    WarningDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DigitOnlyModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    StoreModule.forRoot({order: addOrderReducer})

  ],
  entryComponents: [
    ConfirmationDialogComponent,
    WarningDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
