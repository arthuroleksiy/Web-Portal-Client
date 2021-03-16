/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SizesService } from './sizes.service';

describe('Service: Sizes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SizesService]
    });
  });

  it('should ...', inject([SizesService], (service: SizesService) => {
    expect(service).toBeTruthy();
  }));
});
