import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerPostComponent } from './manger-post.component';

describe('MangerPostComponent', () => {
  let component: MangerPostComponent;
  let fixture: ComponentFixture<MangerPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangerPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
