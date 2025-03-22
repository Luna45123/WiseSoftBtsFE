import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExtensionFareTableComponent } from './edit-extension-fare-table.component';

describe('EditExtensionFareTableComponent', () => {
  let component: EditExtensionFareTableComponent;
  let fixture: ComponentFixture<EditExtensionFareTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExtensionFareTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExtensionFareTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
