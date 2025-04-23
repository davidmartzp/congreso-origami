import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = 'https://origamibogota.com/congreso/api/assistants';

  constructor(private http: HttpClient) { }

  /**
   * Registra un nuevo asistente en el sistema
   * @param data Información del asistente
   */
  registerAssistant(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
