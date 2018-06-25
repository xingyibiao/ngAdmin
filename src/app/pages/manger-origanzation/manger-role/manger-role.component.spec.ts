import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerRoleComponent } from './manger-role.component';

describe('MangerRoleComponent', () => {
  let component: MangerRoleComponent;
  let fixture: ComponentFixture<MangerRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangerRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
