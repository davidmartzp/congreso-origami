import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) { }

  // Obtiene una lista general de events
  getEvents(): Observable<any> {
    const token = localStorage.getItem('OB_access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Crea un nuevo event
  createEvent(eventData: any): Observable<any> {
    const token = localStorage.getItem('OB_access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
    return this.http.post<any>(this.apiUrl, eventData, { headers });
  }

  // Elimina un evento por ID
  deleteEvent(eventId: number): Observable<any> {
    const token = localStorage.getItem('OB_access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
    return this.http.delete<any>(`${this.apiUrl}/${eventId}`, { headers });
  }

  // obtiene eventos activos Route::get('/active-events', [EventController::class, 'activeEvents']);
  getActiveEvents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-active`);
  }


  // Guarda la relación event-attendee usando el endpoint real
  saveEventAttendee(attendeeId: number, eventId: number): Observable<any> {
    const payload = {
      id_attendee: attendeeId,
      id_event: eventId
    };
    return this.http.post<any>(`${environment.apiUrl}/events/storeEventAttendees`, payload);
  }

  // Obtener lista de eventos por asistente
  getEventIdsByAttendee(attendeeId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/getEventIdsByAttendee/${attendeeId}`);
  }

  // Elimina la lista de eventos registrados por un asistente
  removeEventAttendee(attendeeId: number, eventId: number): Observable<any> {
    const payload = {
      id_attendee: attendeeId,
      id_event: eventId
    };
    return this.http.post<any>(`${this.apiUrl}/removeEventAttendee`, payload);
  }

  // Obtiene una lista de talleres con eventos asignados     Route::get('/events/workshops', [WorkshopController::class, 'getActiveWorkshopsWithEvents']);
  getActiveWorkshopsWithEvents(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/events/workshops`);
  }


  // Obtener talleres activos a partir de eventos
  getWorkshopsActive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getWorkshopsActive`);
  }

  // Obtener los asistentes de un evento específico
  getAttendeesByEvent(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAttendeesByEvent/${eventId}`);
  }
}
