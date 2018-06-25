import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionDistributionComponent } from './permission-distribution.component';

describe('PermissionDistributionComponent', () => {
  let component: PermissionDistributionComponent;
  let fixture: ComponentFixture<PermissionDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
