import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { FareService } from '../service/fare.service';
interface Fare {
  id: number;
  stationNumber: number;
  fare: number;
  delete: boolean;
  color: string
}
@Component({
  selector: 'app-edit-fare-table',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    HttpClientModule,
    ModalModule,
    CommonModule,
    FormsModule],
  templateUrl: './edit-fare-table.component.html',
  styleUrl: './edit-fare-table.component.scss'
})
export class EditFareTableComponent {
  fareList: Fare[] = [];
  fareData: { id: number, numberStation: number, fare: number } = { id: 0, numberStation: 0, fare: 0 };
  index: number = 0;
  @ViewChild('seeModal') seeModal!: ModalDirective;
  constructor(private http: HttpClient,private fareService: FareService) { }
  ngOnInit(): void {
    this.getAllFare();
  }

  cleanData() {
    this.fareData = { id: 0, numberStation: 0, fare: 0 };
  }

  getAllFare() {
    this.fareService.getAllFare().subscribe({
      next: (data) => {
        this.fareList = data;
      },
      error: (err) => {
        console.error('โหลด extension fare ไม่สำเร็จ:', err);
      }
    });
  }

  openModel() {
    this.seeModal.show();
  }

  closeModel() {
    this.seeModal.hide();
  }

  edit(data: Fare, i: number) {
    this.fareData = { id: data.id, numberStation: data.stationNumber, fare: data.fare }
    this.index = i;
    this.openModel();
  }

  addData() {
    this.cleanData();
    this.seeModal.show();
  }

  saveDataStationPrice() {
    const newData = {
      id: this.fareData.id, stationNumber: this.fareData.numberStation, fare: this.fareData.fare, delete: false, color: 'none'
    };
    if (newData.id != 0) {
      this.fareList[this.index] = newData;
    } else {
      this.fareList.push(newData);

    }
    this.closeModel();

  }

  delete(index: number) {
    if (!this.fareList[index].delete) {
      this.fareList[index].color = 'delete';
      this.fareList[index].delete = true;
    } else {
      this.fareList[index].delete = false;
      this.fareList[index].color = 'none';
    }
  }

  submit() {
    this.fareService.updateFare(this.fareList).subscribe({
      next: () => {
        alert("บันทึกข้อมูลสำเร็จ");
        this.getAllFare();
      },
      error: (error) => {
        alert("ไม่สามารถบันทึกข้อมูลสำเร็จ");
        console.log(error);
      }
    });
  }

}
