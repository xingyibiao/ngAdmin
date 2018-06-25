import { TestBed, inject } from '@angular/core/testing';

import { MyPostService } from './my-post.service';

describe('MyPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyPostService]
    });
  });

  it('should be created', inject([MyPostService], (service: MyPostService) => {
    expect(service).toBeTruthy();
  }));
});
