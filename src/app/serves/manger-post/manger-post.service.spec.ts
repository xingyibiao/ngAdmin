import { TestBed, inject } from '@angular/core/testing';

import { MangerPostService } from './manger-post.service';

describe('MangerPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangerPostService]
    });
  });

  it('should be created', inject([MangerPostService], (service: MangerPostService) => {
    expect(service).toBeTruthy();
  }));
});
