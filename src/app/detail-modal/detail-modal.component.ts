import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild, viewChild } from '@angular/core';
import { PriceModalComponent } from '../price-modal/price-modal.component';
@Component({
  selector: 'app-detail-modal',
  imports: [PriceModalComponent],
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss'
})
export class DetailModalComponent {
  @ViewChild('seeDetail', { static: true }) seeDetail!: ElementRef;
  @ViewChild('priceModalRef') anotherModal!: PriceModalComponent;

  @Input() startStation:string = '';
  @Input() endStation:string = '';
  @Input() distance:number = 0;
  @Input() time:number = 0;
  @Input() startStationThaiName:string = '';
  @Input() endStationThaiName:string = '';
  @Input() fare!: { single: number; adult: number; student: number; senior: number } | null;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) {
      import('bootstrap').then((bootstrap) => {
        new bootstrap.Modal(this.seeDetail.nativeElement).show();
      });
     
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      import('bootstrap').then((bootstrap) => {
        bootstrap.Modal.getInstance(this.seeDetail.nativeElement)?.hide();
      });
    }
  }

  openPriceModal(){
    this.anotherModal.openModal();
  }

  
}
