import { TestBed, inject } from '@angular/core/testing';

import { MyDepartmentService } from './my-department.service';

describe('MyDepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyDepartmentService]
    });
  });

  it('should be created', inject([MyDepartmentService], (service: MyDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
