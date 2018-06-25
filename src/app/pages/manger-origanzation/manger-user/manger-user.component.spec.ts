import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerUserComponent } from './manger-user.component';

describe('MangerUserComponent', () => {
  let component: MangerUserComponent;
  let fixture: ComponentFixture<MangerUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangerUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
