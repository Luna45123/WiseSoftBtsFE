import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsMapComponent } from './bts-map.component';

describe('BtsMapComponent', () => {
  let component: BtsMapComponent;
  let fixture: ComponentFixture<BtsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtsMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
