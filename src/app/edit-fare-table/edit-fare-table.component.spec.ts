import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFareTableComponent } from './edit-fare-table.component';

describe('EditFareTableComponent', () => {
  let component: EditFareTableComponent;
  let fixture: ComponentFixture<EditFareTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFareTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFareTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
