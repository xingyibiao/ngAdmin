import { TestBed, inject } from '@angular/core/testing';

import { MangerCompanyService } from './manger-company.service';

describe('MangerCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangerCompanyService]
    });
  });

  it('should be created', inject([MangerCompanyService], (service: MangerCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
