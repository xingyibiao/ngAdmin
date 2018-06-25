import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDepartmentComponent } from './my-department.component';

describe('MyDepartmentComponent', () => {
  let component: MyDepartmentComponent;
  let fixture: ComponentFixture<MyDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
