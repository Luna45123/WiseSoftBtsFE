import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-price-modal',
  imports: [],
  templateUrl: './price-modal.component.html',
  styleUrl: './price-modal.component.scss'
})
export class PriceModalComponent {
  @ViewChild('ModalPrice', { static: true }) modal!: ElementRef;
  @Input() fare!: { single: number; adult: number; student: number; senior: number } | null;
  @Input() startStation:string = '';
  @Input() endStation:string = '';
  @Input() startStationThaiName:string = '';
  @Input() endStationThaiName:string = '';
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  openModal() {
    if (isPlatformBrowser(this.platformId)) {
      import('bootstrap').then((bootstrap) => {
        new bootstrap.Modal(this.modal.nativeElement).show();
      });
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      import('bootstrap').then((bootstrap) => {
        bootstrap.Modal.getInstance(this.modal.nativeElement)?.hide();
      });
    }
  }

}
