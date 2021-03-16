/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderProductService } from './orderProduct.service';

describe('Service: OrderProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderProductService]
    });
  });

  it('should ...', inject([OrderProductService], (service: OrderProductService) => {
    expect(service).toBeTruthy();
  }));
});
