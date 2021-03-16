import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Customer } from '../../interfaces/Customer';
import { Component, OnInit } from '@angular/core';
import {CustomerService } from '../../services/customers/customers.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  today = Date.now();
  checkError: string;

  constructor(private router: Router, private customerService: CustomerService, private formBuilder: FormBuilder) { }
  /*AddCustomerForm = this.formBuilder.group({
    creationDate: this.today,
    customerName: "",
    customerAddress: "",
    customerId: 0
    });*/
  AddCustomerForm = new FormGroup({
    creationDate: new FormControl(this.today),
    customerName: new FormControl('',Validators.required),
    customerAddress: new FormControl('',Validators.required),
    customerId: new FormControl('' )});
  ngOnInit() {
  }
  addCustomer(customer: Customer): void {
    if(customer.customerName === '' || customer.customerAddress ==='')
      throw this.checkError = "Wrong name or address"
    this.customerService.addCustomer(customer).subscribe((data: any) => {
      console.log(data);

    }, error => console.log(error));
    this.router.navigate(['customers']);
  }

  get customerName() { return this.AddCustomerForm.get('customerName')}
  get customerAddress() { return this.AddCustomerForm.get('customerAddress')}
}
