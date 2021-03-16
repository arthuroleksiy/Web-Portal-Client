
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Order } from '../../interfaces/Order';
import { Customer } from '../../interfaces/Customer';

import {CustomerService } from '../../services/customers/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) { }

  customers: Customer[] = [];



  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((data) =>
    {
      this.customers = data;
      console.log(data);
    });
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe((data) =>
    {
      this.customers = data;
      console.log(data);
    });
  }
  getOrder(): void {
    this.customerService.getCustomers().subscribe((data) =>
    {
      this.customers = data;
      console.log(data);
    });
  }
  addCustomer(customer: Customer): void {
    this.customerService.addCustomer(customer).subscribe((data: any) => {
      console.log(data);
      this.customers = data;
    }, error => console.log(error));
  }
}
