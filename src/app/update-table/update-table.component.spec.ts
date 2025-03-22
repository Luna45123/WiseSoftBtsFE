import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTableComponent } from './update-table.component';

describe('UpdateTableComponent', () => {
  let component: UpdateTableComponent;
  let fixture: ComponentFixture<UpdateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
