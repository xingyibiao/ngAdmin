import { TestBed, inject } from '@angular/core/testing';

import { MangerDepartmentService } from './manger-department.service';

describe('MangerDepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangerDepartmentService]
    });
  });

  it('should be created', inject([MangerDepartmentService], (service: MangerDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
