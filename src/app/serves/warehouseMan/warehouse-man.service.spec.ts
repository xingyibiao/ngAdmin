import { TestBed, inject } from '@angular/core/testing';

import { WarehouseManService } from './warehouse-man.service';

describe('WarehouseManService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseManService]
    });
  });

  it('should be created', inject([WarehouseManService], (service: WarehouseManService) => {
    expect(service).toBeTruthy();
  }));
});
