import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diagnostico, CrearDiagnostico, ActualizarDiagnostico } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  private apiUrl = 'https://localhost:7248/api/diagnosticos';

  constructor(private http: HttpClient) { }

  getDiagnosticos(): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(this.apiUrl);
  }

  getDiagnostico(id: number): Observable<Diagnostico> {
    return this.http.get<Diagnostico>(`${this.apiUrl}/${id}`);
  }

  crear(diagnostico: CrearDiagnostico): Observable<Diagnostico> {
    return this.http.post<Diagnostico>(this.apiUrl, diagnostico);
  }

  actualizar(id: number, diagnostico: ActualizarDiagnostico): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, diagnostico);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}