import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl = `${environment.apiUrl}/rooms`;

  constructor(private http: HttpClient) { }

  // Obtiene una lista general de rooms
  getRooms(): Observable<any> {
    const token = localStorage.getItem('OB_access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
