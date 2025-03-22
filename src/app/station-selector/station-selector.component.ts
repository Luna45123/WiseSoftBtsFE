import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { PriceModalComponent } from "../price-modal/price-modal.component";


interface Station {
  id: number;
  stationId: string;
  stationName: string;
  stationNameThai: string;
  extension: boolean;
}
interface FareResponse {
  single: number;
  adult: number;
  student: number;
  senior: number;
  path: string[];
  time: number;
  distance: number;
  start: string;
  end: string;
  startNameThai: string;
  endNameThai: string;
}
@Component({
  selector: 'app-station-selector',
  imports: [
    ModalModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    DetailModalComponent,
],
  
  templateUrl: './station-selector.component.html',
  styleUrl: './station-selector.component.scss'
})
export class StationSelectorComponent {
  selectedStationStart: string = '';
  selectedStationEnd: string = '';
  
  selectedLine: string = '';
  stations: Station[] = [];
  stationStart: Station[] = [];
  stationEnd: Station[] = [];
  stationStartName: string = '';
  stationEndName: string = '';
  stationStartNameThai: string = '';
  stationEndNameThai: string = '';

  single: number = 0;
  adult: number = 0;
  student: number = 0;
  senior: number = 0;

  fare: { single: number, adult: number; student: number; senior: number } | null = null;
  path: string[] = [];
  distance: number = 0;
  time: number = 0;
  showFareModal = false;
  showPriceModal = false;

  @ViewChild('seeDetailRef') seeDetail!: DetailModalComponent;
  @ViewChild('priceModalRef') priceModal!: PriceModalComponent;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

   }


  getStations(line: string): Observable<Station[]> {
    return this.http.get<Station[]>(`http://localhost:8080/fare/by-line?lineName=${line}`);
  }


  calculateFare() {
    if (!this.selectedStationStart || !this.selectedStationEnd) return;

    this.http.get<FareResponse>(`http://localhost:8080/fare/getFare?start=${this.selectedStationStart}&end=${this.selectedStationEnd}`)
      .subscribe({
        next: (data) => {
          this.fare = {
            single: data.single,
            adult: data.adult,
            student: data.student,
            senior: data.senior
          };
          this.path = data.path;
          this.time = data.time;
          this.distance = data.distance;
          this.stationStartName = data.start;
          this.stationEndName = data.end;
          this.stationStartNameThai = data.startNameThai
          this.stationEndNameThai = data.endNameThai;

          this.openModal();
        },
        error: (err) => {
          console.error("เกิดข้อผิดพลาดในการคำนวณค่าโดยสาร:", err);
        }
      });
  }

  getStationDetail(stationName: string) {
    console.log(stationName);
    this.http.get<Station>(`http://localhost:8080/fare/get-station-detal?stationName=${stationName}`)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลสถานี:", err);
        }
      });

  }


  selectStartLine(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedLine = target.value;
    this.stationStart = [];
    this.selectedStationStart = '';

    this.getStations(this.selectedLine).subscribe({
      next: (data) => {
        this.stationStart = data; // ✅ อัปเดตรายการสถานีเมื่อดึงข้อมูลเสร็จ;
        this.stationStart = this.stationStart.filter((station: Station) => !station.stationName.includes('Sena Ruam'));
      },
      error: (err) => {
        console.error("เกิดข้อผิดพลาดในการโหลดสถานี:", err);
      }
    });
  }

  selectEndLine(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedLine = target.value;
    this.stationEnd = [];
    this.selectedStationEnd = '';

    this.getStations(this.selectedLine).subscribe({
      next: (data) => {
        this.stationEnd = data; // ✅ อัปเดตรายการสถานีเมื่อดึงข้อมูลเสร็จ
        this.stationEnd = this.stationEnd.filter((station: Station) => !station.stationName.includes('Sena Ruam'));
      },
      error: (err) => {
        console.error("เกิดข้อผิดพลาดในการโหลดสถานี:", err);
      }
    });
  }

  openModal() {
    this.seeDetail.openModal();
    
  }
}
