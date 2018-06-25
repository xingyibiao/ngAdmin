import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerDepartmentComponent } from './manger-department.component';

describe('MangerDepartmentComponent', () => {
  let component: MangerDepartmentComponent;
  let fixture: ComponentFixture<MangerDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangerDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
