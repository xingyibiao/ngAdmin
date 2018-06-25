import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerCompanyComponent } from './manger-company.component';

describe('MangerCompanyComponent', () => {
  let component: MangerCompanyComponent;
  let fixture: ComponentFixture<MangerCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangerCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
