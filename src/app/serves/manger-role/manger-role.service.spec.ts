import { TestBed, inject } from '@angular/core/testing';

import { MangerRoleService } from './manger-role.service';

describe('MangerRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangerRoleService]
    });
  });

  it('should be created', inject([MangerRoleService], (service: MangerRoleService) => {
    expect(service).toBeTruthy();
  }));
});
