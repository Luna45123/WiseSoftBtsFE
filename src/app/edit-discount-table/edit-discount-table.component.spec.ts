import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiscountTableComponent } from './edit-discount-table.component';

describe('EditDiscountTableComponent', () => {
  let component: EditDiscountTableComponent;
  let fixture: ComponentFixture<EditDiscountTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDiscountTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDiscountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
