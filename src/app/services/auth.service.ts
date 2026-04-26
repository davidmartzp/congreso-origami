import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private apiUrl = environment.apiUrl ;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      this.apiUrl + '/login' ,
      { email: username, password },
      { headers }
    ).pipe(
      tap(response => {
        if (response && response.success) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      })
    );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('OB_access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
    return this.http.post<any>(
      this.apiUrl + '/logout',
      {},
      { headers }
    ).pipe(
      tap({
        next: () => {
          this.isAuthenticated = false;
          localStorage.removeItem('OB_access_token');
          window.location.reload();
        },
        error: () => {
          // Incluso si hay error, limpiar estado local
          this.isAuthenticated = false;
          localStorage.removeItem('OB_access_token');
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
