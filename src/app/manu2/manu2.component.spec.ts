import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Manu2Component } from './manu2.component';

describe('Manu2Component', () => {
  let component: Manu2Component;
  let fixture: ComponentFixture<Manu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manu2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Manu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
