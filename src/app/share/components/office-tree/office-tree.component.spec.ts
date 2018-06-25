import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeTreeComponent } from './office-tree.component';

describe('OfficeTreeComponent', () => {
  let component: OfficeTreeComponent;
  let fixture: ComponentFixture<OfficeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
