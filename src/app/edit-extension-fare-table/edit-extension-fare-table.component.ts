import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ExtensionService } from '../service/extension.service';

interface Extension  {
  id:number, typeId: string, price: number, customerTypeName: string
};

@Component({
  selector: 'app-edit-extension-fare-table',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    HttpClientModule,
    ModalModule,
    CommonModule,
    FormsModule,
],
  templateUrl: './edit-extension-fare-table.component.html',
  styleUrl: './edit-extension-fare-table.component.scss'
})
export class EditExtensionFareTableComponent {
  extensionFareList:Extension[] = [];
  index: number = 0;
  fareExData:{id:number,exPrice:number,exType:string,exTypeId:string}  = {id:0,exPrice:0,exType:'',exTypeId:''};
  @ViewChild('exFareModal') exFareModal!: ModalDirective;
  constructor(private http: HttpClient,private extenService:ExtensionService) { }
  ngOnInit(): void {
    this.getExtensionFare();
  }

  cleanData() {
    this.fareExData = {id:0,exPrice:0,exType:'',exTypeId:''};
    this.index = 0;
  }

  getExtensionFare(){
    this.extenService.getExtensionFare().subscribe({
      next:(data) => {
        this.extensionFareList = data;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  openExFareModal(){
    this.exFareModal.show();
  }

  closeExFareModal(){
    this.exFareModal.hide();
    this.cleanData();
  }

  editExtension(data: any, i: number) {
    this.fareExData = {id:data.id,exPrice:data.price,exType:data.customerTypeName,exTypeId:data.typeId}
    this.index = i;
    this.openExFareModal();
  }

  saveDataExFare() {
    const newData = {
      id: this.fareExData.id, typeId: this.fareExData.exTypeId, price: this.fareExData.exPrice, customerTypeName: this.fareExData.exType
    };
    if (newData.id != 0) {
      this.extensionFareList[this.index] = newData;
    } else {
      this.extensionFareList.push(newData);

    }
    this.closeExFareModal();

  }

  submitEx() {
    this.extenService.updateExtensionFare(this.extensionFareList).subscribe({
      next: () => {
        alert("บันทึกข้อมูลสำเร็จ");
        this.getExtensionFare();
      },
      error:(error) =>{
        alert("ไม่สามารถบันทึกข้อมูลสำเร็จ");
        console.log(error);
      }
    });
  }

   
}
