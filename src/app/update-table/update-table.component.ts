import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button'; // Add this if you use buttons inside the table
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { EditFareTableComponent } from "../edit-fare-table/edit-fare-table.component";
import { EditExtensionFareTableComponent } from "../edit-extension-fare-table/edit-extension-fare-table.component";
import { EditDiscountTableComponent } from "../edit-discount-table/edit-discount-table.component";
interface Fare {
  id: number;
  stationNumber: number;
  fare: number;
  delete: boolean;
  color: string
}
@Component({
  selector: 'app-update-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    RouterOutlet,
    ModalModule,
    CommonModule,
    FormsModule,
    EditFareTableComponent,
    EditExtensionFareTableComponent,
    EditDiscountTableComponent
],
  templateUrl: './update-table.component.html',
  styleUrl: './update-table.component.scss'
})
export class UpdateTableComponent {
  fareList: Fare[] = [];
  extensionFareList:any = [];
  discountList: any = [];
  fareData: {id:number,numberStation:number,fare:number} = {id:0,numberStation:0,fare:0};
  fareExData:{id:number,exPrice:number,exType:string,exTypeId:string}  = {id:0,exPrice:0,exType:'',exTypeId:''};
  discountData:{id:number,discount:number,discountType:string,discountTypeId:string} = {id:0,discount:0,discountType:'',discountTypeId:''}
  index: number = 0;

  constructor(private http: HttpClient, private authService: AuthService) { }
  ngOnInit(): void {

  }
 
}
