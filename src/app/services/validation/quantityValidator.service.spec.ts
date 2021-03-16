/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuantityValidatorService } from './quantityValidator.service';

describe('Service: QuantityValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuantityValidatorService]
    });
  });

  it('should ...', inject([QuantityValidatorService], (service: QuantityValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
