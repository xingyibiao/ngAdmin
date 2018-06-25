import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseManComponent } from './warehouse-man.component';

describe('WarehouseManComponent', () => {
  let component: WarehouseManComponent;
  let fixture: ComponentFixture<WarehouseManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
