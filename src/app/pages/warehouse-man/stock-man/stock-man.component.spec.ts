import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockManComponent } from './stock-man.component';

describe('StockManComponent', () => {
  let component: StockManComponent;
  let fixture: ComponentFixture<StockManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
