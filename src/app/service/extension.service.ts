import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Extension  {
  id:number, typeId: string, price: number, customerTypeName: string
};
@Injectable({
  providedIn: 'root'
})
export class ExtensionService {

  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getExtensionFare(): Observable<Extension[]> {
    return this.http.get<Extension[]>(`${this.baseUrl}/extension-fare`);
  }

  updateExtensionFare(data: Extension[]): Observable<Extension[]> {
    return this.http.post<Extension[]>(`${this.baseUrl}/extension-fare-update`, data);
  }
}
