import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  private apiUrl = 'https://origamibogota.com/congreso/api/getWorkshops';

  constructor(private http: HttpClient) { }
  
  // Obtiene una lista general de talleres
  getWorkshops(): Observable<any> {
    return this.http.get<any>("https://origamibogota.com/congreso/api/getWorkshops");
  }

  // Obtiene un taller específico por correo electrónico del asistente
  getWorkshopByEmail(email: string): Observable<any> {
    const url = `https://origamibogota.com/congreso/api/workshops`;
    return this.http.post<any>(url, { email });
  }
  
  // Actualiza un taller específico
  updateWorkshop(workshopData: any): Observable<any> {
    const url = `https://origamibogota.com/congreso/api/workshops`;
    return this.http.put<any>(url, workshopData);
  }

  // Sube una imagen para un taller específico
  uploadWorkshopImage(workshopId: number, imageFile: File): Observable<any> {
    const url = `https://origamibogota.com/congreso/api/upload-image`;
    
    // Crear un objeto FormData para enviar archivos binarios
    const formData = new FormData();
    formData.append('idw', workshopId.toString());
    formData.append('image', imageFile);
    
    return this.http.post<any>(url, formData);
  }

  // Elimina un taller específico
  deleteWorkshop(id: number): Observable<any> {
    const url = `https://origamibogota.com/congreso/api/workshops`;
    // Usamos DELETE con un cuerpo que contiene el ID
    return this.http.delete<any>(url, { body: { id } });
  }

  // Añade uno o varios talleres nuevos
  addWorkshops(assistantId: number, workshops: any[]): Observable<any> {
    const url = `https://origamibogota.com/congreso/api/addworkshops`;
    return this.http.post<any>(url, {
      id_assistant: assistantId,
      workshops: workshops
    });
  }
}
