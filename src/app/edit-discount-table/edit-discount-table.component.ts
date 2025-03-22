import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DiscountService } from '../service/discount.service';

interface Discount {
  id: number, typeId: string, discount: number, cutomerTypeName: string
};
@Component({
  selector: 'app-edit-discount-table',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    HttpClientModule,
    ModalModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './edit-discount-table.component.html',
  styleUrl: './edit-discount-table.component.scss'
})
export class EditDiscountTableComponent {
  @ViewChild('discountMoadl') discountMoadl!: ModalDirective;
  discountList: Discount[] = [];
  index: number = 0;
  discountData: { id: number, discount: number, discountType: string, discountTypeId: string } = { id: 0, discount: 0, discountType: '', discountTypeId: '' }
  constructor(private http: HttpClient,private discountService:DiscountService) { }
  ngOnInit(): void {
    this.getDiscount();
  }

  cleanData() {
    this.discountData = { id: 0, discount: 0, discountType: '', discountTypeId: '' };
    this.index = 0;
  }

  getDiscount() {
      this.discountService.getDiscountFare().subscribe({
        next: (data) => {
          this.discountList = data;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  openDiscountModal() {
    this.discountMoadl.show();
  }
  closeDiscountModal() {
    this.discountMoadl.hide();
    this.cleanData();
  }

  editDiscount(data: Discount, i: number) {
    this.discountData = { id: data.id, discount: data.discount, discountType: data.cutomerTypeName, discountTypeId: data.typeId }
    this.index = i;
    this.openDiscountModal();
  }

  saveDiscount() {
    const newData = {
      id: this.discountData.id, typeId: this.discountData.discountTypeId, discount: this.discountData.discount > 100 ? 100 : this.discountData.discount, cutomerTypeName: this.discountData.discountType
    };
    if (newData.id != 0) {
      this.discountList[this.index] = newData;
    } else {
      this.discountList.push(newData);
    }
    this.closeDiscountModal();
  }

  submitDiscount() {
    this.discountService.updateDiscountFare(this.discountList).subscribe({
      next: () => {
        alert("บันทึกข้อมูลสำเร็จ");
        this.getDiscount();
      },
      error: (error) => {
        alert("ไม่สามารถบันทึกข้อมูลสำเร็จ");
        console.log(error);
      }
    });
  }

  updatDiscount(data: any) {
    const apiAd = "http://localhost:8080/api/admin/";
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // ✅ ใส่ JWT Token ใน Header
    });
    this.http.post<Discount[]>(`${apiAd}update-discount`, data, { headers }).subscribe({
      next:(data) => {
        this.discountList = data;
      },
      error:(error) => {
        console.log(error)
      }
    });
  }

}
