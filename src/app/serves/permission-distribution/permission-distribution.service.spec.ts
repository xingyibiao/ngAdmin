import { TestBed, inject } from '@angular/core/testing';

import { PermissionDistributionService } from './permission-distribution.service';

describe('PermissionDistributionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionDistributionService]
    });
  });

  it('should be created', inject([PermissionDistributionService], (service: PermissionDistributionService) => {
    expect(service).toBeTruthy();
  }));
});
