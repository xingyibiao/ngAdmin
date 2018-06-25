import { TestBed, inject } from '@angular/core/testing';

import { MangerUserService } from './manger-user.service';

describe('MangerUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangerUserService]
    });
  });

  it('should be created', inject([MangerUserService], (service: MangerUserService) => {
    expect(service).toBeTruthy();
  }));
});
