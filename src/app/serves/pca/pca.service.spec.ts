import { TestBed, inject } from '@angular/core/testing';

import { PcaService } from './pca.service';

describe('PcaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PcaService]
    });
  });

  it('should be created', inject([PcaService], (service: PcaService) => {
    expect(service).toBeTruthy();
  }));
});
