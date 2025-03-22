import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Fare {
  id: number;
  stationNumber: number;
  fare: number;
  delete: boolean;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class FareService {
  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getAllFare(): Observable<Fare[]> {
    return this.http.get<Fare[]>(`${this.baseUrl}/getAllFare`);
  }

  updateFare(fares: Fare[]): Observable<Fare[]> {
    return this.http.post<Fare[]>(`${this.baseUrl}/update`, fares);
  }

  getExtensionFare(): Observable<Fare[]> {
    return this.http.get<Fare[]>(`${this.baseUrl}/extension-fare`);
  }

  updateExtensionFare(data: any): Observable<Fare[]> {
    return this.http.post<Fare[]>(`${this.baseUrl}/extension-fare-update`, data);
  }
}
