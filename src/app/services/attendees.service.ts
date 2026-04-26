import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // importar environment

@Injectable({
  providedIn: 'root'
})
export class AttendeesService {
  private apiUrl = `${environment.apiUrl}`; // usar variable de entorno

  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of attendees from the API.
   * @returns An observable containing the list of attendees.
   */
  getAttendees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/assistants');
  }

  /** actualiza */
  updateAttendee(attendee: any): Observable<any> {
    // attendee.pay_amount debe ser string
    return this.http.put<any>(`${this.apiUrl}/assistants/${attendee.id}`, attendee);
  }

  // confirma muchos asistentes confirmManyAttendees
  confirmManyAttendees(idsObject: { ids: number[] }): Observable<any> {
    const url = `${this.apiUrl}/confirmManyAttendees`; 
    return this.http.post<any>(url, idsObject);
  }

  // Verifica el código de un asistente
  verifyAttendeeCode(email: string, code: string): Observable<any> {
    const url = `${this.apiUrl}/assistants/verifyAttendeeCode`;
    const body = { email: email, code: code };
    return this.http.post<any>(url, body);
  }
}
