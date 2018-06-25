import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTreeComponent } from './product-tree.component';

describe('ProductTreeComponent', () => {
  let component: ProductTreeComponent;
  let fixture: ComponentFixture<ProductTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
