import { TestBed, inject } from '@angular/core/testing';

import { StockManService } from './stock-man.service';

describe('StockManService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockManService]
    });
  });

  it('should be created', inject([StockManService], (service: StockManService) => {
    expect(service).toBeTruthy();
  }));
});
