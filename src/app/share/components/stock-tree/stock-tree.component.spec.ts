import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTreeComponent } from './stock-tree.component';

describe('StockTreeComponent', () => {
  let component: StockTreeComponent;
  let fixture: ComponentFixture<StockTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
