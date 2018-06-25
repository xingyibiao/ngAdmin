import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTreeComponent } from './post-tree.component';

describe('PostTreeComponent', () => {
  let component: PostTreeComponent;
  let fixture: ComponentFixture<PostTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
