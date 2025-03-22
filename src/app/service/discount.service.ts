import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Discount {
  id: number, typeId: string, discount: number, cutomerTypeName: string
};
@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

   getDiscountFare(): Observable<Discount[]> {
      return this.http.get<Discount[]>(`${this.baseUrl}/getAllDiscount`);
    }
  
    updateDiscountFare(data: Discount[]): Observable<Discount[]> {
      return this.http.post<Discount[]>(`${this.baseUrl}/update-discount`, data);
    }
}
